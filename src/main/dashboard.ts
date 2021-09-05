import { ipcMain } from 'electron';
import path from 'path';

import Window from '../lib/window';

const bgColor = '#000';

const dashboardInit = (window: Window) => () => {
    window.send('dashboard-init', true);
};

const setListeners = (window: Window) => {
    ipcMain.on('dashboard-init', dashboardInit(window));
};

const shutDownListeners = () => {
    ipcMain.off('dashboard-init', dashboardInit);
}

export const createDashboardWindow = (onClose: () => void, isDev: boolean) => {
    const window = new Window({
        backgroundColor: bgColor,
        display: 'cursor',
        filename: path.resolve(__dirname, 'dashboard.html'),
        height: 'full',
        width: 'full',
        resizable: isDev,
        webPreferences: {
            preload: path.resolve(__dirname, 'dashboardPreloader.js'),
        },
        onClosed: () => {
            shutDownListeners();
            onClose();
        },
    });

    setListeners(window);

    return window;
};