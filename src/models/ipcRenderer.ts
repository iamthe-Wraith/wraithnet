import { ipcMain } from "electron";

 const win = (window as any);

export class IpcRenderer {
  static authenticate = (username: string, password: string) => win.App.authenticate(username, password)
  static close = () => win.App.close()
  static init = () => win.App.init()
  static test = (data: string) => win.App.test(data);
}