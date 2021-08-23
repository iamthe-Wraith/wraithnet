import { IpcRendererEvent } from 'electron/main';
import { IpcRenderer } from './base';

const win = (window as any);

export class TerminalIpcRenderer extends IpcRenderer {
    static exec = (command: string) => win.App.exec(command)
    static initTerminal = (execResponse: (e: IpcRendererEvent, res: any) => void) => win.App.initTerminal(execResponse)
}