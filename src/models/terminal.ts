import { CommandLine } from "electron";
import { IpcRendererEvent } from "electron/main";
import { action, makeObservable, observable } from "mobx";
import { CommandModel, CommandType } from "./command";
import { TerminalIpcRenderer as IpcRenderer } from './ipcRenderers/terminal';

type PrivateFields = '_feed';

export interface CommandResponse {
    result?: string;
    error?: string;
};

export class TerminalModel {
    private _feed: CommandModel[] = [];

    constructor() {
        makeObservable<TerminalModel, PrivateFields>(this, {
            _feed: observable,
            exec: action.bound,
            execResponse: action.bound,
        });
    }

    get feed() {
        return this._feed;
    }

    public exec = async (cmd: string) => {
        const command = new CommandModel(cmd, CommandType.COMMAND);
        this._feed.push(command);
        IpcRenderer.exec(command.command);
    }

    public execResponse = (_: IpcRendererEvent, { result, error }: CommandResponse) => {
        const command = new CommandModel(result ?? error, !!result ? CommandType.RESULT : CommandType.ERROR);
        this._feed.push(command);
    }
}
