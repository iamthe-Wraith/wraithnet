import path from 'path';
import { ipcMain, IpcMainEvent } from "electron";

import Window from '../../lib/window';
import { TerminalModel } from './model';

let terminalModel: TerminalModel;

const bgColor = '#000';

const onTerminalCommand = (e: IpcMainEvent, cmd: string) => {
    terminalModel.exec(cmd)
        .then(result => e.sender.send('terminal-command', result))
        .catch(err => e.sender.send('terminal-command', { error: err.message }));
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