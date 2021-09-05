import path from 'path';
import keytar from 'keytar';
import { ipcMain } from 'electron';

import Window from '../lib/window';
import { IpcMainEvent } from 'electron/main';
import { Base, IBaseProps } from './base';
import { getKeyTarService } from '../lib/utils';

const bgColor = '#000';

interface IProps extends IBaseProps {
  isDev: boolean;
  onSuccess: () => void;
}

class Auth extends Base {
    private _isDev: boolean;
    private _window: Window;
    private _onSuccess: () => void;
    private _authToken: string;

    constructor(props: IProps) {
        super();
        this._isDev = props.isDev;
        this._onSuccess = props.onSuccess;
    }

    public init = async () => new Promise((resolve, reject) => {
        const service = getKeyTarService();
        keytar.getPassword(service, service)
            .then(result => {
                if (!result) {
                    this.setListeners();
                    this.createWindow();
                } else {
                    this._authToken = result;
                    this.verifyToken();
                }
            })
            .catch(err => {
                console.log(err);
            });
    })

    private authenticate = async (username: string, password: string) => {
        const result = await this.webServiceHelper.sendRequest<void>({
            data: { username, password },
            method: 'POST',
            path: '/auth'
        }, true);

        console.log(result);

        if (result.success) {
            this._onSuccess();
            setTimeout(() => {
                this._window.close();
            }, 2000);
        } else {
            throw new Error(result.error ?? 'Authentication Error');
        }
    }

    private createWindow = () => {
        this._window = new Window({
            backgroundColor: bgColor,
            display: 'cursor',
            filename: path.resolve(__dirname, 'login.html'),
            height: 250,
            width: 370,
            resizable: this._isDev,
            webPreferences: {
                preload: path.resolve(__dirname, 'loginPreloader.js'),
            },
            onClosed: () => {
                this._window = null;
            },
        });
    }

    private setListeners = async () => {
        ipcMain.on('close-login-window', () => {
            this._window?.close();
        });

        ipcMain.on('authenticate', async (e: IpcMainEvent, [username, password]) => {
            if (!username) {
                e.sender.send('authentication-error', 'username is required');
            } else if (!password) {
                e.sender.send('authentication-error', 'password is required');
            } else {
                try {
                    await this.authenticate(username, password);
                } catch (err: any) {
                    e.sender.send('authentication-error', err.message);
                }
            }
        });
    }

    private verifyToken = async () => {
        const result = await this.webServiceHelper.sendRequest({
            method: 'POST',
            path: '/auth/verify-token'
        });

        if (result.success) {
            this._onSuccess();
        } else {
            this.setListeners();
            this.createWindow();
        }
    }
}

export const createLoginWindow = async (onSuccess: () => void, isDev: boolean) => {
    const login = new Auth({ isDev, onSuccess });
    login.init();
}
