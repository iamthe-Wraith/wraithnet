import { IpcRenderer } from './base';

const win = (window as any);

export class DashboardIpcRenderer extends IpcRenderer {
    static initDashboard = () => win.App.initDashboard()
}