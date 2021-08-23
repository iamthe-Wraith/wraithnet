import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { LoginIpcRenderer } from '../models/ipcRenderers/login';
import { basePreloader } from './base';

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  exec: (cmd: string) => {
    ipcRenderer.send('terminal-command', cmd);
  },
  init: (onExec: (e: IpcRendererEvent, res: any) => void) => {
      ipcRenderer.on('terminal-command', (e: IpcRendererEvent, res: any) => {
            console.log('terminal command response received');
            onExec(e, res);
      });
  }
});