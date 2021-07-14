import path from 'path';
import { ipcMain, IpcMainEvent } from "electron";

import Window from './lib/window';

const bgColor = '#000';

const onTerminalCommand = (e: IpcMainEvent, msg: string) => {
    console.log('termainal-command', e, msg);
};

export const createTerminalWindow = (onClose: () => void, isDev: boolean) => {
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
            ipcMain.off('terminal-command', onTerminalCommand);
            onClose();
        },
    });
    
    ipcMain.on('terminal-command', onTerminalCommand);

    return window;
}