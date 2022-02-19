const win = (window as any);

export class IpcRenderer {
    static closeApp = () => win.App.closeApp()
    static init = () => win.App.init()
    static loadConfig = () => win.App.loadConfig()
    static logout = () => win.App.logout()
    static navigate = (url: string) => win.App.navigate(url)
    static test = (data: string) => win.App.test(data)
}