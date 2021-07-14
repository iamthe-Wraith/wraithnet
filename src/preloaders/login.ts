import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { basePreloader } from './base';

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  authenticate: (username: string, password: string) => new Promise((_, reject) => {
    console.log('inside preloader authentiated');
    
    ipcRenderer.send('authenticate', [username, password]);
    ipcRenderer.once('authentication-error', (e: IpcRendererEvent, msg: string) => {
      reject(new Error(msg));
    });
  }),
  init: () => {
    // ipcRenderer.on('authentication-error', (e: IpcRendererEvent, msg: string) => {
    //   console.log('authentication-error: ', msg);
    // });
  },
});