import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('App', {
  init: () => {
    console.log('dashboard preloader');
  },
  test: (data: string) => {
    ipcRenderer.send('dashboard test', data);
  }
});