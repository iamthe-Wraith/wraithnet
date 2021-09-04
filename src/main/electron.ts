import path from 'path';
import "core-js/stable";
import "regenerator-runtime/runtime";
import keytar from 'keytar';
import { app, globalShortcut, ipcMain } from 'electron';
import electronReload from 'electron-reload';

import { IWindow } from '../types';
import { IpcMainEvent } from 'electron/main';
import { createTerminalWindow } from './terminal';
import { createDashboardWindow } from './dashboard';
import { createLoginWindow } from './login';
import { getKeyTarService } from '../lib/utils';

if (process.env.NODE_ENV === 'development') {
    electronReload(path.join(__dirname, '..'), {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
    });   
}

const dev = process.env.NODE_ENV === 'development';

const windows: {[key: string]: IWindow | null} = {
    dashboard: null,
    terminal: null,
};

const closeApp = () => {
    Object.keys(windows).forEach(window => {
        windows[window]?.close();
    });
}

const broadcast = (channel: string, msg?: string) => {
    Object.values(windows).forEach((window: IWindow) => {
        window?.send('broadcast-event', { event: channel, data: msg });
    });
}

const setGlobalShortcuts = () => {
    globalShortcut.register('ctrl+/', () => {
        if (!windows.terminal) {
            windows.terminal = createTerminalWindow(() => { windows.terminal = null; }, dev, broadcast);
        } else {
            windows.terminal.close();
        }
    });
};

const onAuthenticationSuccess = () => {
    setGlobalShortcuts();
    windows.dashboard = createDashboardWindow(() => { windows.dashboard = null; }, dev);
}

const deleteToken = (e: IpcMainEvent) => {
    const service = getKeyTarService();
    keytar.deletePassword(service, service);
    e.sender.send('delete-token');
}

const getToken = (e: IpcMainEvent) => {
    const service = getKeyTarService();
    keytar.getPassword(service, service)
        .then(result => {
            if (result) {
                e.sender.send('get-token', result);
            } else {
                createLoginWindow(onAuthenticationSuccess, dev);
                Object.values((window: IWindow) => window?.close());
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const setToken = (e: IpcMainEvent, token: string) => {
    const service = getKeyTarService();
    keytar.setPassword(service, service, token);
    e.sender.send('set-token');
}

app.on('ready', () => {
    createLoginWindow(onAuthenticationSuccess, dev);
});

ipcMain.on('logout', async () => {
    try {
        const service = getKeyTarService();
        await keytar.deletePassword(service, service);
        createLoginWindow(onAuthenticationSuccess, dev);

        Object.keys(windows).forEach(window => {
            windows[window]?.close();
        });
    } catch (err) {
        console.log('an error occurred while loging out: ', err.message);
    }
});

ipcMain.on('user-profile-updated', () => {
    Object.values((window: IWindow) => window?.send('user-profile-update', true));
});

ipcMain.on('close-app', closeApp);
ipcMain.on('delete-token', deleteToken);
ipcMain.on('get-token', getToken);
ipcMain.on('set-token', setToken);

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
    console.log('ipcMain:test:args ', msg);

    setTimeout(() => {
        e.sender.send('test', 'this is from the main processes');
    }, 2000);
});