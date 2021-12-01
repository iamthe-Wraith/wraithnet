import { IpcRenderer } from './base';

const win = (window as any);

export class DashboardIpcRenderer extends IpcRenderer {
  static close = () => win.App.close()
  static focus = () => win.App.focus()
  static initDashboard = () => win.App.initDashboard()
  static open = (w: string) => win.App.open(w)
}