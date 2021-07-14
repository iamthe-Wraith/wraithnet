import { IpcRenderer } from './base';

const win = (window as any);

export class DashboardIpcRenderer extends IpcRenderer {
    static init = () => win.App.init()   
}