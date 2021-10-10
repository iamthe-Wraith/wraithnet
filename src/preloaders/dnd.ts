import { contextBridge, ipcRenderer } from 'electron';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    close: () => ipcRenderer.send('close', 'dnd'),
});