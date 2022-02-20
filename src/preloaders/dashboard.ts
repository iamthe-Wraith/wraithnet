import { contextBridge, ipcRenderer } from 'electron';
import { Themes } from '../constants';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    close: () => ipcRenderer.send('close-dashboard'),
    focus: () => ipcRenderer.send('focus-dashboard'),
    initDashboard: () => {
    // send message initialize any functionality
    // needed in the main process for this window
        return ipcRendererAction('dashboard-init');
    },
    open: (win: string) => {
        ipcRenderer.send('open', win);
    },
    updateTheme: (newTheme: Themes) => ipcRenderer.send('update-theme', newTheme),
});