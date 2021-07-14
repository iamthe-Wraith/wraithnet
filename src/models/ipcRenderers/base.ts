const win = (window as any);

export class IpcRenderer {
  static close = () => win.App.close()
  static test = (data: string) => win.App.test(data);
}