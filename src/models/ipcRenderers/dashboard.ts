import { IpcRenderer } from './base';

export interface IDashboardListeners {
    onUserLogUpdate: () => void;
}

const win = (window as any);

export class DashboardIpcRenderer extends IpcRenderer {
    static init = (listeners: IDashboardListeners) => win.App.init(listeners)
}