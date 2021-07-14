import { ipcRenderer } from 'electron';

export const basePreloader = {
    close: () => {
        ipcRenderer.send('close-login-window');
    },
    test: (data: string) => {
        ipcRenderer.send('test', data);
    }
}