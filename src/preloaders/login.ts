import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    authenticate: (username: string, password: string) => new Promise((_, reject) => {    
        ipcRenderer.send('authenticate', [username, password]);
        ipcRenderer.once('authentication-error', (_: IpcRendererEvent, msg: string) => {
            reject(new Error(msg));
        });
    }),
    loaded: () => ipcRenderer.send('login-loaded'),
});