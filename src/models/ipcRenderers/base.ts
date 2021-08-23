const win = (window as any);

export class IpcRenderer {
  static close = () => win.App.close()
  static init = () => win.App.init()
  static test = (data: string) => win.App.test(data)
}