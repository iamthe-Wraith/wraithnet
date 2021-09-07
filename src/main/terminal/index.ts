import path from 'path';
import { ipcMain, IpcMainEvent } from "electron";

import Window from '../../lib/window';
import { TerminalModel } from './model';

let terminalModel: TerminalModel;
let window: Window;

const bgColor = '#000';

const terminalInit = () => {
    if (window) window.send('terminal-init', true);
};

const closeListeners = () => {
    ipcMain.off('terminal-init', terminalInit);
    ipcMain.off('terminal-command', onTerminalCommand);
}

const setListeners = () => {
    ipcMain.on('terminal-init', terminalInit);
    ipcMain.on('terminal-command', onTerminalCommand);
};

const onTerminalCommand = (e: IpcMainEvent, cmd: string) => {
    terminalModel.exec(cmd)
        .then(result => e.sender.send('terminal-command', result))
        .catch(err => e.sender.send('terminal-command', { error: err.message }));
};

export const createTerminalWindow = (
    onClose: () => void,
    isDev: boolean,
    broadcast: (channel: string, msg?: string) => void,
    quitApp: () => void
) => {
    terminalModel = new TerminalModel(broadcast, quitApp);

    window = new Window({
        backgroundColor: bgColor,
        display: 'cursor',
        filename: path.resolve(__dirname, 'terminal.html'),
        height: 400,
        width: 800,
        x: 'center',
        y: 'bottom',
        resizable: isDev,
        webPreferences: {
            devTools: process.env.NODE_ENV === 'development',
            preload: path.resolve(__dirname, 'terminalPreloader.js'),
        },
        onClosed: () => {
            terminalModel = null;
            window = null;
            closeListeners();
            onClose();
        },
    });

    setListeners();

    return window;
}