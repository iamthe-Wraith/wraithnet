import path from 'path';
import "core-js/stable";
import "regenerator-runtime/runtime";
import keytar from 'keytar';
import { app, globalShortcut, ipcMain, shell } from 'electron';
import updateElectronApp from 'update-electron-app';

import { IWindow } from '../types';
import { IpcMainEvent } from 'electron/main';
import { Terminal } from './terminal';
import { Dashboard } from './dashboard';
import { Login } from './login';
import { getKeyTarService } from '../lib/utils';
import { Base } from './base';
import { DnD } from './dnd';

updateElectronApp({ repo: 'iamthe-Wraith/wraithnet' });

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const electronReload = require('electron-reload');
    electronReload(path.join(__dirname, '..'), {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    });   
}

const dev = process.env.NODE_ENV === 'development';

interface IWindows {
    dashboard: Base;
    dnd: Base;
    login: Base;
    terminal: Base;
}

let windows: IWindows = {
    dashboard: null,
    dnd: null,
    login: null,
    terminal: null,
};

const quitApp = () => {
    Object.entries(windows).forEach(([name, window]) => {
        console.log(`quitApp: closing ${name}`);
        window?.close();
    });
};

const broadcast = (channel: string, msg?: string) => {
    Object.values(windows).forEach(window => {
        window?.send('broadcast-event', { event: channel, data: msg });
    });
};

const setGlobalShortcuts = () => {
    globalShortcut.register('ctrl+/', (windows.terminal as Terminal).toggle);
};

const onAuthenticationSuccess = () => {
    setGlobalShortcuts();
    windows.dashboard.init();
};

const deleteToken = (e: IpcMainEvent) => {
    const service = getKeyTarService();
    keytar.deletePassword(service, service);
    e.sender.send('delete-token');
};

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
};

const logout = async () => {
    try {
        const service = getKeyTarService();
        await keytar.deletePassword(service, service);

        await windows.login.init();

        Object.entries(windows).map(([key, win]) => {
            if (key !== 'login' && !!win) win.close();
        });
    } catch (err: any) {
        console.log('an error occurred while loging out: ', err.message);
    }
};

const navigate = (_: IpcMainEvent, url: string) => shell.openExternal(url);

const onLoginLoad = () => {
    Object.entries(windows).forEach(([name, window]) => {
        if (name !== 'login') {
            console.log(`onLoginLoad: closing ${name}`);
            window.close();
        }
    });
};

const open = (win: string) => {
    switch (win) {
        case 'dnd':
            windows.dnd.init();
            return true;
        default:
            return false;
    }
};

const setToken = (e: IpcMainEvent, token: string) => {
    const service = getKeyTarService();
    keytar.setPassword(service, service, token);
    e.sender.send('set-token');
};

app.on('ready', () => {
    windows = {
        dashboard: new Dashboard({
            broadcast,
            isDev: dev,
        }),
        dnd: new DnD({
            broadcast,
            isDev: dev,
        }),
        login: new Login({
            broadcast,
            isDev: dev,
            onLoad: onLoginLoad,
            onSuccess: onAuthenticationSuccess,
        }),
        terminal: new Terminal({
            broadcast,
            logout,
            open,
            quitApp,
            isDev: dev,
        }),
    };

    windows.login.init();
});

ipcMain.on('logout', logout);

ipcMain.on('user-profile-updated', () => {
    Object.values((window: IWindow) => window?.send('user-profile-update', true));
});

ipcMain.on('close-app', quitApp);
ipcMain.on('delete-token', deleteToken);
ipcMain.on('get-token', getToken);
ipcMain.on('navigate', navigate);
ipcMain.on('open', (e: IpcMainEvent, window: string) => {
    switch (window) {
        case 'dnd':
            windows.dnd.init();
            break;
        default: 
            break;
    }
});
ipcMain.on('set-token', setToken);

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
    console.log('ipcMain:test:args ', msg);

    setTimeout(() => {
        e.sender.send('test', 'this is from the main processes');
    }, 2000);
});