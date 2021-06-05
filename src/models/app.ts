export class App {
  private _window = window as any;
  close = () => {
    this._window.App.close();
  }
}