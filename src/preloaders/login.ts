import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('App', {
  close: () => {
    ipcRenderer.send('close-app');
  }
});