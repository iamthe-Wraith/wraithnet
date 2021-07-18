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
import { User } from '../models/user';

if (process.env.NODE_ENV === 'development') {
  electronReload(path.join(__dirname, '..'), {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
  });   
}

const dev = true;

const windows: {[key: string]: IWindow | null} = {
  dashboard: null,
  terminal: null,
};

const closeApp = (forceCloseLoginWindow?: boolean) => {
  if (forceCloseLoginWindow) windows.login?.close();
  windows.login = null;

  Object.keys(windows).forEach(window => {
    windows[window]?.close();
  });
}

const setGlobalShortcuts = () => {
  globalShortcut.register('ctrl+/', () => {
    if (!windows.terminal) {
      windows.terminal = createTerminalWindow(() => { windows.terminal = null; }, dev);
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
    keytar.deletePassword('wraithnet', 'wraithnet');
    e.sender.send('delete-token');
}

const getToken = (e: IpcMainEvent) => {
    keytar.getPassword('wraithnet', 'wraithnet')
        .then(result => {
            if (result) {
                e.sender.send('get-token', result);
            } else {
                createLoginWindow(closeApp, onAuthenticationSuccess, dev);
                Object.values((window: IWindow) => window?.close());
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const setToken = (e: IpcMainEvent, token: string) => {
    keytar.setPassword('wraithnet', 'wraithnet', token);
    e.sender.send('set-token');
}

app.on('ready', () => {
  createLoginWindow(closeApp, onAuthenticationSuccess, dev);
});

ipcMain.on('close-app', () => {
  closeApp(true);
});

ipcMain.on('logout', async () => {
  try {
    await keytar.deletePassword('wraithnet', 'wraithnet');
    createLoginWindow(closeApp, onAuthenticationSuccess, dev);

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

ipcMain.on('delete-token', deleteToken);
ipcMain.on('get-token', getToken);
ipcMain.on('set-token', setToken);

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
  console.log('ipcMain:test:args ', msg);

  setTimeout(() => {
    e.sender.send('test', 'this is from the main processes');
  }, 2000);
});