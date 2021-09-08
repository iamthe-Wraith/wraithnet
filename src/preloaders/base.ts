import { ipcRenderer, IpcRendererEvent } from 'electron';

export const ipcRendererAction = <T>(channel: string, data?: any, timeout = 5000): Promise<T> => new Promise((resolve, reject) => {
    ipcRenderer.send(channel, data);

    const timer = setTimeout(() => {
        reject(new Error(`${channel} timed out`));
    }, timeout);

    ipcRenderer.once(channel, (_: IpcRendererEvent, res: T) => {
        clearTimeout(timer);
        resolve(res);
    });
});

export const basePreloader = {
    close: () => {
        ipcRenderer.send('close-app');
    },
    deleteToken: () => ipcRendererAction('delete-token'),
    getToken: () => ipcRendererAction<string>('get-token'),
    init: async () => {
        // listen for any broadcasted events from other windows
        ipcRenderer.on('broadcast-event', (_, { event, data }) => {
            window.dispatchEvent(new window.CustomEvent(event, { detail: data }));
        });
    },
    setToken: (token: string) => ipcRendererAction('set-token', token),
    test: (data: string) => {
        ipcRenderer.send('test', data);
    }
}