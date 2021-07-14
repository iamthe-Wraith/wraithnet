import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { basePreloader } from './base';

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  exec: (cmd: string) => {
    console.log('terminal command: ', cmd);
  },
  init: () => {
      console.log('terminal init');
  }
});