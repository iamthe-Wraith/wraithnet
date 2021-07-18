import { contextBridge } from 'electron';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
  ...basePreloader,
  init: () => ipcRendererAction('dashboard-init')
});