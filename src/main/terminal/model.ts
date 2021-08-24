import { TerminalIpcRenderer } from "../../models/ipcRenderers/terminal";
import { CommandResponse } from "../../models/terminal";
import { Base } from "../base";

enum Type {
    String = 'string',
    Integer = 'integer',
    Float = 'float',
    CSL = 'comma-separated-list',
}

interface IParsedCommand {
    command: string;
    pieces: string[];
}

interface IArgument {
    args: [string, string];
    type: Type;
}

interface IParameter {
    name: string;
    required?: boolean;
    type: Type;
}

type Flag = [string, string];

interface ICommandStructure {
    arguments?: IArgument[];
    flags?: Flag[];
    parameters?: IParameter[];
}

interface ICommandValues<TArguments, TFlags, TParameters> {
    arguments?: TArguments;
    error?: string;
    flags?: TFlags;
    parameters?: TParameters;
}

export class TerminalModel extends Base {
    private _command: IParsedCommand = null;
    private _broadcast: (channel: string, msg?: string) => void;

    constructor (broadcast: (channel: string, msg?: string) => void) {
        super();
        this._broadcast = broadcast;
    }

    private initParseCommand = (command: string) => {
        const quotationsRegex = /\"(.*?)\"/gm;
        const quotations: string[] = [];
        let pieces: string[] = [];
    
        let match = quotationsRegex.exec(command)
        while(match !== null) {
            quotations.push(match[1]);
            match = quotationsRegex.exec(command);
        }
    
        command.split(quotationsRegex).forEach(p => {
            if (quotations.find(q => q === p)) {
                pieces.push(p);
            } else {
                pieces = [...pieces, ...p.split(' ')];
            }
        });
    
        pieces = pieces.filter(p => !!p.trim());

        this._command = { command, pieces };
    }

    private parseCommand = <TArguments, TFlags, TParameters>({ arguments: args = [], flags = [], parameters = [] }: ICommandStructure): ICommandValues<TArguments, TFlags, TParameters> => {
        let pieces = [...this._command.pieces];
        pieces.shift();
        
        // ensure there are no invalid arguments or flags included
        pieces.forEach(p => {
            if (p[0] === '-') {
                let validPiece = false;
                validPiece = !!args.find(({ args }) => p === `-${args[0]}` || p === `--${args[1]}`);

                if (!validPiece) {
                    validPiece = !!flags.find(([short, long]) => p === `-${short}` || p === `--${long}`);
                }
                if (!validPiece) {
                    throw new Error(`invalid property found: ${p}`);
                }
            }
        });

        let _arguments: any = {};
        args.forEach(({ args, type }) => {
            const [short, long] = args;

            for (let i = 0; i < pieces.length; i++) {
                if (`-${short}` === pieces[i] || `--${long}` === pieces[i]) {
                    let value: any = TerminalModel.getValue(pieces[i + 1], type);
                    pieces.splice(i, 2);

                    _arguments = {
                        ..._arguments,
                        [short]: value,
                        [long]: value,
                    }
                    
                    break;
                }
            }
        });
        
        let _flags: any = {}
        flags.forEach(([short, long]) => {
            const found = this._command.pieces.find(p => `-${short}` === p || `--${long}` === p);
            _flags = {
                ..._flags,
                [short]: found,
                [long]: found,
            };
        });

        let _parameters: any = {};
        parameters.forEach(({ name, required, type }) => {
            if (pieces.length) {
                _parameters = {
                    ..._parameters,
                    [name]: TerminalModel.getValue(pieces[0], type),
                }
                pieces.shift();
            } else if (required) {
                throw new Error(`required parameter ${name} not found`);
            }
        });

        if (pieces.length) {
            return { error: `invalid command. unknown properties: ${pieces.join(' ')}` };
        }

        return {
            arguments: _arguments,
            flags: _flags,
            parameters: _parameters,
        };
    }

    public exec = async (command: string): Promise<CommandResponse> => {
        if (!command) {
            return { error: 'no command found' };
        }

        this.initParseCommand(command);
        
        if (!this._command?.pieces || this._command.pieces.length === 0) {
            return { error: 'invalid command found' };
        }

        switch (this._command.pieces[0]) {
            case 'log':
                return this.submitUserLogEntry();
            case 'open':
                return this.execOpenCommand();
            default:
                return { error: `command not found: ${this._command.pieces[0]}` };
        }
    }

    private execOpenCommand = async () => {
        switch (this._command.pieces[1]) {
            case 'userlog':
                this._broadcast('open-command', this._command.pieces[1]);
                return { result: `${this._command.pieces[1]} opened successfully` }
            default:
                return { error: `unknown open command argument: ${this._command.pieces[1]}` };
        }
    }

    private submitUserLogEntry = async () => {
        interface IUserLogArguments {
            t?: string;
            tags?: string;
        }

        interface IUserLogParameters {
            content: string;
        }

        const structure: ICommandStructure = {
            arguments: [{ args: ['t', 'tags'], type: Type.CSL }],
            parameters: [{ name: 'content', type: Type.String }], 
        };

        try {
            const parsed = this.parseCommand<IUserLogArguments, null, IUserLogParameters>(structure);

            if (parsed.error) return { error: parsed.error };

            const { arguments: args, error, parameters } = parsed;
            if (error) {
                return { error };
            }

            const result = await this.webServiceHelper.sendRequest({
                path: '/api/v1/user-log',
                method: 'POST',
                data: {
                    content: parameters.content,
                    tags: args.t ?? args.tags ?? [],
                },
            });

            if (result.success) {
                this._broadcast('userlog-update');
                return { result: 'entry logged successfuly' };
            } else {
                return { error: result.value as string };
            }
        } catch (err) {
            return { error: err.message };
        }
    }

    private test = async () => {
        const structure: ICommandStructure = {
            arguments: [],  // { args: ['n', 'number'], type: number } => command -n 8
            flags: [],      // ['a', 'all'] => $ ls --all
            parameters: [], // { required: true, type: string } => grep "some text"
        };

        // parse the command to get all flags, parameters, and arguments
        // construct the request
        // make the request
        // return the ICommandResponse
    }

    static getValue = (v: string, type: Type) => {
        let value: any = v;

        if (type === Type.Integer) {
            const int = parseInt(value);
            if (isNaN(int)) {
                throw new Error(`invalid value found: ${value}`);
            } else {
                value = int;
            }
        } else if (type === Type.Float) {
            const float = parseFloat(value);
            if (isNaN(value)) {
                throw new Error(`invalid value found: ${value}`);
            } else {
                value = float;
            }
        } else if (type === Type.CSL) {
            value = value
                .split(',')
                .map((v: string) => v.trim())
                .filter((v: string) => !!v);
        }

        return value;
    }
}
