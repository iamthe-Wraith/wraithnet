import { contextBridge, ipcRenderer } from 'electron';
import { basePreloader } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    close: () => ipcRenderer.send('close-dnd'),
});