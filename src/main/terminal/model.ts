import { CommandResponse } from "../../models/terminal";
import { Base } from "../base";

interface IParsedCommand {
    command: string;
    pieces: string[];
}

interface IArgument {
    args: string[];
    type: string;
}

interface IParameter {
    required: boolean;
    type: string;
}

type Flag = string[];

interface ICommandStructure {
    arguments?: IArgument[];
    flags?: Flag[];
    parameters?: IParameter[];
}

export class TerminalModel extends Base {
    private _command: IParsedCommand = null;

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

    private parseCommand = (structure: ICommandStructure) => {
        
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
            default:
                return { error: `command not found: ${this._command.pieces[0]}` };
        }
    }

    private submitUserLogEntry = async () => {
        const structure: ICommandStructure = {
            arguments: [{ args: ['-t', '--tags'], type: 'string' }], // { args: ['n', 'number'], type: number } => command -n 8
            flags: [], // ['a', 'all'] => $ ls --all
            parameters: [], // { required: true, type: string } => grep "some text"
        };

        const parsed = this.parseCommand(structure);

        const result = await this.webServiceHelper.sendRequest({
            path: '/api/v1/user-log',
            method: 'POST',
            data: { content, tags },
        });

        return { result: 'entry logged successfuly' };
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
}
