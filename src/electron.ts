import path from 'path';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { app, globalShortcut, ipcMain } from 'electron';
import electronReload from 'electron-reload';

import Window from './lib/window';
import { Auth } from './auth';
import { IWindow } from './types';
import { IpcMainEvent } from 'electron/main';

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

const createDashboard = () => {
  windows.dashboard = new Window({
   backgroundColor: bgColor,
   display: 'cursor',
   filename: path.resolve('.', 'dist', 'dashboard.html'),
   height: 'full',
   width: 'full',
   resizable: dev,
   webPreferences: {
     preload: path.resolve(__dirname, 'dashboardPreloader.js'),
   },
   onClosed: () => {
     windows.dashboard = null;
   },
 });
}

const setGlobalShortcuts = () => {

};

const onAuthenticationSuccess = () => {
  globalShortcut.register('ctrl+/', () => {
    // createTerminalWindow();
    console.log('ctrl+/ pressed');
    
  });
  createDashboard();
}

app.on('ready', () => {
  setGlobalShortcuts();

  const login = new Auth({
    isDev: dev,
    onSuccess: onAuthenticationSuccess,
  });

  login.init();
});

ipcMain.on('close-app', () => {
  windows.login?.close();
});

ipcMain.on('test', (e: IpcMainEvent, msg: string) => {
  console.log('ipcMain:test:args ', msg);

  setTimeout(() => {
    e.sender.send('test', 'this is from the main processes');
  }, 2000);
});