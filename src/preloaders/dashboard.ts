import { contextBridge, ipcRenderer } from 'electron';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    close: () => ipcRenderer.send('close-dashboard'),
    initDashboard: () => {
        // send message initialize any functionality
        // needed in the main process for this window
        return ipcRendererAction('dashboard-init');
    }
});