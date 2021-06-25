export class IpcRenderer {
  static close = () => {
    (window as any).App.close();
  }
}