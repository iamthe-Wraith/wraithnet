import path from 'path';
import { ipcMain, IpcMainEvent } from "electron";

import Window from '../../lib/window';
import { CommandResponse } from "../../models/terminal";
import { Base, IBaseProps } from '../base';

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

interface IProps extends IBaseProps {
    logout: () => void;
    open: (win: string) => boolean;
    quitApp: () => void
}

export class Terminal extends Base {
    private _command: IParsedCommand = null;
    private _logout: () => void;
    private _open: (win: string) => boolean;
    private _quitApp: () => void;

    constructor(props: IProps) {
        super(props);
        this._logout = props.logout;
        this._open = props.open;
        this._quitApp = props.quitApp;
        this._windowName = 'terminal';
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

    public init = () => {
        this._createWindow();
        this._setListeners();
    }

    public toggle = () => {
        this._isOpen
            ? this.close()
            : this.init();
    }

    protected _createWindow = () => {
        this._window = new Window({
            backgroundColor: '#000',
            display: 'cursor',
            filename: path.resolve(__dirname, 'terminal.html'),
            height: 400,
            width: 800,
            x: 'center',
            y: 'bottom',
            webPreferences: {
                devTools: process.env.NODE_ENV === 'development',
                preload: path.resolve(__dirname, 'terminalPreloader.js'),
            },
            onClosed: () => {
                this._shutdownListeners();
                this._onCloseCallback?.();
            },
        });

        this._isOpen = true;
    }

    private _execCommand = async (command: string): Promise<CommandResponse> => {
        if (!command) {
            return { error: 'no command found' };
        }

        this._initParseCommand(command);
        
        if (!this._command?.pieces || this._command.pieces.length === 0) {
            return { error: 'invalid command found' };
        }

        switch (this._command.pieces[0]) {
            case 'exit':
                this.close();
                this._quitApp();
                return;
            case 'log':
                return this._submitUserLogEntry();
            case 'logout':
                this._logout();
                return;
            case 'open':
                this.close();
                return this._execOpenCommand();
            default:
                return { error: `command not found: ${this._command.pieces[0]}` };
        }
    }

    private _execOpenCommand = async () => {
        switch (this._command.pieces[1]) {
            case 'dnd':
                return this._open('dnd')
                    ? { result: `${this._command.pieces[1]} opened successfully` }
                    : { error: 'an error occurred while trying to open dnd' };
            case 'userlog':
                this._broadcast('open-command', this._command.pieces[1]);
                return { result: `${this._command.pieces[1]} opened successfully` };
            default:
                return { error: `unknown open command argument: ${this._command.pieces[1]}` };
        }
    }

    private _initParseCommand = (command: string) => {
        const quotationsRegex = /"(.*?)"/gm;
        const quotations: string[] = [];
        let pieces: string[] = [];
    
        let match = quotationsRegex.exec(command);
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

    private _onTerminalCommand = (e: IpcMainEvent, cmd: string) => {
        this._execCommand(cmd)
            .then(result => e.sender.send('terminal-command', result))
            .catch(err => e.sender.send('terminal-command', { error: err.message }));
    }

    private _onTerminalInit = () => {
        this._window?.send('terminal-init', true);
    }

    private _parseCommand = <TArguments, TFlags, TParameters>({ arguments: args = [], flags = [], parameters = [] }: ICommandStructure): ICommandValues<TArguments, TFlags, TParameters> => {
        const pieces = [...this._command.pieces];
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
                    const value: any = Terminal.getValue(pieces[i + 1], type);
                    pieces.splice(i, 2);

                    _arguments = {
                        ..._arguments,
                        [short]: value,
                        [long]: value,
                    };
                    
                    break;
                }
            }
        });
        
        let _flags: any = {};
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
                    [name]: Terminal.getValue(pieces[0], type),
                };
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

    private _setListeners = () => {
        this.__setListeners();
        ipcMain.on('terminal-command', this._onTerminalCommand);
        ipcMain.on('terminal-init', this._onTerminalInit);
    }

    private _shutdownListeners = () => {
        this.__shutdownListeners();
        ipcMain.off('terminal-command', this._onTerminalCommand);
        ipcMain.off('terminal-init', this._onTerminalInit);
    }

    private _submitUserLogEntry = async () => {
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
            const parsed = this._parseCommand<IUserLogArguments, null, IUserLogParameters>(structure);

            if (parsed.error) return { error: `error 001 - ${parsed.error}` };

            const { arguments: args, error, parameters } = parsed;
            if (error) {
                return { error: `error 002 - ${error}` };
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
                return { error: `error 003 - ${result.value}` as string };
            }
        } catch (err: any) {
            return { error: `error 004 - ${err.message}` };
        }
    }
}