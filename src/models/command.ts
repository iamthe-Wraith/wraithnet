import { computed, makeObservable, observable } from "mobx";

export enum CommandType {
    COMMAND = 'COMMAND',
    ERROR = 'ERROR',
    RESULT = 'RESULT',
}

type PrivateFields = '_type' | '_command';

export class CommandModel {
    private _command: string = '';
    private _type: CommandType = null;

    constructor(command: string, type: CommandType) {
        this._type = type;
        this._command = command;

        makeObservable<CommandModel, PrivateFields>(this, {
            _command: observable,
            _type: observable,
            command: computed,
            type: computed,
        })
    }

    get command() {
        return this._command;
    }

    get type() {
        return this._type;
    }
}