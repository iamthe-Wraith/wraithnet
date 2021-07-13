import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('App', {
  init: () => {
    console.log('terminal preloader');
  },
  test: (data: string) => {
    ipcRenderer.send('terminal test', data);
  }
});