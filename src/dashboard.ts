import path from 'path';

import Window from './lib/window';

const bgColor = '#000';

export const createDashboardWindow = (onClose: () => void, isDev: boolean) => {
    const window = new Window({
        backgroundColor: bgColor,
        display: 'cursor',
        filename: path.resolve('.', 'dist', 'dashboard.html'),
        height: 'full',
        width: 'full',
        resizable: isDev,
        webPreferences: {
            preload: path.resolve(__dirname, 'dashboardPreloader.js'),
        },
        onClosed: () => {
            onClose();
        },
    });

    return window;
};