import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('App', {
  authenticate: (username: string, password: string) => new Promise((_, reject) => {
    console.log('inside preloader authentiated');
    
    ipcRenderer.send('authenticate', [username, password]);
    ipcRenderer.once('authentication-error', (e: IpcRendererEvent, msg: string) => {
      reject(new Error(msg));
    });
  }),
  close: () => {
    ipcRenderer.send('close-login-window');
  },
  init: () => {
    // ipcRenderer.on('authentication-error', (e: IpcRendererEvent, msg: string) => {
    //   console.log('authentication-error: ', msg);
    // });
  },
  test: (data: string) => {
    ipcRenderer.send('test', data);
  }
});