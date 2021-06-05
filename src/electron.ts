import path from 'path';
import { app, globalShortcut, ipcMain } from 'electron';
import electronReload from 'electron-reload';

import Window from './lib/window';
import { IWindow } from './types';

if (process.env.NODE_ENV === 'development') {
  electronReload(path.join(__dirname, '..'), {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
  });   
}

const bgColor = '#000';
const dev = true;

const windows: {[key: string]: IWindow | null} = {
  dashboard: null,
  login: null,
  terminal: null,
};

const createLoginWindow = () => {
  windows.login = new Window({
    backgroundColor: bgColor,
    display: 'cursor',
    filename: path.resolve('.', 'dist', 'login.html'),
    height: 250,
    width: 370,
    resizable: dev,
    webPreferences: {
      preload: path.resolve(__dirname, 'loginPreloader.js'),
    },
    onClosed: () => {
      windows.login = null;
    },
  });

  return windows.login;
};

const setGlobalShortcuts = () => {
  // globalShortcut.register('ctrl+/', () => {
  //   createTerminalWindow();
  // });
};

app.on('ready', () => {
  setGlobalShortcuts();

  createLoginWindow();
});

ipcMain.on('close-app', () => {
  windows.login?.close();
});