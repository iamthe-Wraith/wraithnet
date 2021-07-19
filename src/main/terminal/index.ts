import path from 'path';
import { ipcMain, IpcMainEvent } from "electron";

import Window from '../../lib/window';
import { CommandResponse } from '../../models/terminal';
import { TerminalModel } from './model';

let terminalModel: TerminalModel;

const bgColor = '#000';

const parseCommand = (command: string) => {

}

const onTerminalCommand = (e: IpcMainEvent, cmd: string) => {
    const parsed = parseCommand(cmd);

    console.log('>>>>> command entered: ', parsed);

    let result: CommandResponse;
    switch (parsed.pieces[0]) {
        case 'log':
            submitUserLogEntry(parsed);
            result = { result: 'entry logged successfully' };
            break;
        default:
            result = { error: `invalid command: ${parsed.pieces[0]}` };
            break;
    }

    e.sender.send('terminal-command', result);
};

export const createTerminalWindow = (onClose: () => void, isDev: boolean) => {
    terminalModel = new TerminalModel();

    const window = new Window({
        backgroundColor: bgColor,
        display: 'cursor',
        filename: path.resolve('.', 'dist', 'terminal.html'),
        height: 400,
        width: 800,
        x: 'center',
        y: 'bottom',
        resizable: isDev,
        webPreferences: {
            preload: path.resolve(__dirname, 'terminalPreloader.js'),
        },
        onClosed: () => {
            terminalModel = null;
            ipcMain.off('terminal-command', onTerminalCommand);
            onClose();
        },
    });
    
    ipcMain.on('terminal-command', onTerminalCommand);

    return window;
}