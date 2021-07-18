import { IpcRenderer } from './base';

const win = (window as any);

export class TerminalIpcRenderer extends IpcRenderer {
    static init = () => win.App.init()
}