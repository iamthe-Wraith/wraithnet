import { IpcRenderer } from './base';

const win = (window as any);

export class LoginIpcRenderer extends IpcRenderer {
    static authenticate = (username: string, password: string) => win.App.authenticate(username, password)
    static init = () => win.App.init()   
}