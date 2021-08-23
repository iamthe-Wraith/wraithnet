import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { basePreloader, ipcRendererAction } from './base';

contextBridge.exposeInMainWorld('App', {
    ...basePreloader,
    exec: (cmd: string) => ipcRenderer.send('terminal-command', cmd),
    initTerminal: (onExec: (e: IpcRendererEvent, res: any) => void) => {
        // listen for responses from terminal commands being executed
        ipcRenderer.on('terminal-command', onExec);

        // send message initialize any functionality
        // needed in the main process for this window
        return ipcRendererAction('terminal-init');
    }
});