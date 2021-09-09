import { IpcRenderer } from './base';

const win = (window as any);

export class DashboardIpcRenderer extends IpcRenderer {
    static close = () => win.App.close()
    static initDashboard = () => win.App.initDashboard()
}