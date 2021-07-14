import path from 'path';
import "core-js/stable";
import "regenerator-runtime/runtime";
import keytar from 'keytar';
import { app, globalShortcut, ipcMain } from 'electron';
import electronReload from 'electron-reload';

import { IWindow } from './types';
import { IpcMainEvent } from 'electron/main';
import { createTerminalWindow } from './terminal';
import { createDashboardWindow } from './dashboard';
import { createLoginWindow } from './login';

if (process.env.NODE_ENV === 'development') {
  electronReload(path.join(__dirname, '..'), {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
  });   
}

const bgColor = '#000';
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

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
  console.log('ipcMain:test:args ', msg);

  setTimeout(() => {
    e.sender.send('test', 'this is from the main processes');
  }, 2000);
});