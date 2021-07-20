import { contextBridge, ipcRenderer } from 'electron';
import { IDashboardListeners } from '../models/ipcRenderers/dashboard';
import { basePreloader, ipcRendererAction } from './base';

const setListeners = (listeners: IDashboardListeners) => {
  ipcRenderer.on('userlog-update', listeners.onUserLogUpdate);
};

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  init: (listeners: IDashboardListeners) => {
    setListeners(listeners);
    return ipcRendererAction('dashboard-init');
  }
});