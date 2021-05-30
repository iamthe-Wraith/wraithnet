import path from 'path';
import { app, globalShortcut, ipcMain } from 'electron';

import Window from './lib/window';
import { IWindow } from './types';

const bgColor = '#000';
const dev = false;

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