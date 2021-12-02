import { IpcRenderer } from './base';

const win = (window as any);

export class DnDIpcRenderer extends IpcRenderer {
  static close = () => win.App.close()
}