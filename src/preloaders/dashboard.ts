import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { basePreloader } from './base';

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  init: () => {
    console.log('dasboard init');
  }
});