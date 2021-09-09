import path from 'path';
import "core-js/stable";
import "regenerator-runtime/runtime";
import keytar from 'keytar';
import { app, globalShortcut, ipcMain } from 'electron';

import { IWindow } from '../types';
import { IpcMainEvent } from 'electron/main';
import { Terminal } from './terminal';
import { Dashboard } from './dashboard';
import { Login } from './login';
import { getKeyTarService, noop } from '../lib/utils';
import { Base } from './base';

if (process.env.NODE_ENV === 'development') {
    const electronReload = require('electron-reload');
    electronReload(path.join(__dirname, '..'), {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
    });   
}

const dev = process.env.NODE_ENV === 'development';

interface IWindows {
    dashboard: Base;
    login: Base;
    terminal: Base;
}

let windows: IWindows = {
    dashboard: null,
    login: null,
    terminal: null
};

const quitApp = () => {
    Object.entries(windows).forEach(([name, window]) => {
        console.log(`quitApp: closing ${name}`);
        window?.close();
    });
}

const broadcast = (channel: string, msg?: string) => {
    Object.values(windows).forEach(window => {
        window?.send('broadcast-event', { event: channel, data: msg });
    });
}

const setGlobalShortcuts = () => {
    globalShortcut.register('ctrl+/', (windows.terminal as Terminal).toggle);
};

const onAuthenticationSuccess = () => {
    setGlobalShortcuts();
    windows.dashboard.init();
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
                windows.login.init();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const logout = async () => {
    try {
        const service = getKeyTarService();
        await keytar.deletePassword(service, service);

        windows.login.init();
    } catch (err: any) {
        console.log('an error occurred while loging out: ', err.message);
    }
}

const onLoginLoad = () => {
    Object.entries(windows).forEach(([name, window]) => {
        if (name !== 'login') {
            console.log(`onLoginLoad: closing ${name}`);
            window.close();
        };
    });
}

const setToken = (e: IpcMainEvent, token: string) => {
    const service = getKeyTarService();
    keytar.setPassword(service, service, token);
    e.sender.send('set-token');
}

app.on('ready', () => {
    windows = {
        dashboard: new Dashboard({ isDev: dev }),
        login: new Login({
            isDev: dev,
            onLoad: onLoginLoad,
            onSuccess: onAuthenticationSuccess,
        }),
        terminal: new Terminal({
            broadcast,
            logout,
            quitApp,
            isDev: dev,
        }),
    }

    windows.login.init();
});

ipcMain.on('logout', logout);

ipcMain.on('user-profile-updated', () => {
    Object.values((window: IWindow) => window?.send('user-profile-update', true));
});

ipcMain.on('close-app', quitApp);
ipcMain.on('delete-token', deleteToken);
ipcMain.on('get-token', getToken);
ipcMain.on('set-token', setToken);

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
    console.log('ipcMain:test:args ', msg);

    setTimeout(() => {
        e.sender.send('test', 'this is from the main processes');
    }, 2000);
});