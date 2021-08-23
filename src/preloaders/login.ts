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
    initLogin: () => {
        // send message initialize any functionality
        // needed in the main process for this window
        return ipcRendererAction('login-init');
    },
});