import path from 'path';
import keytar from 'keytar';
import { ipcMain } from 'electron';

import Window from '../lib/window';
import { IpcMainEvent } from 'electron/main';
import { Base, IBaseProps } from './base';
import { getKeyTarService, noop } from '../lib/utils';

const bgColor = '#000';

type AuthenticationRequest = [string, string];

interface IProps extends IBaseProps {
    isDev: boolean;
    onLoad?: () => void;
    onSuccess: () => void;
}

export class Login extends Base {
    private _onLoad: () => void;
    private _onSuccess: () => void;
    private _authToken: string;

    constructor(props: IProps) {
        super(props);
        this._windowName = 'login';
        this._onSuccess = props.onSuccess;
        this._onLoad = props.onLoad || noop;
    }

    public init = async () => new Promise(() => {
        const service = getKeyTarService();
        keytar.getPassword(service, service)
            .then(result => {
                if (!result) {
                    this._createWindow();
                    this._setListeners();
                } else {
                    this._authToken = result;
                    this.verifyToken();
                }
            })
            .catch(err => {
                console.log(err);
            });
    })
            
    private _authenticate = async (e: IpcMainEvent, [username, password]: AuthenticationRequest) => {
        if (!username) {
            e.sender.send('authentication-error', 'username is required');
            return;
        } else if (!password) {
            e.sender.send('authentication-error', 'password is required');
            return;
        }

        const result = await this.webServiceHelper.sendRequest<void>({
            data: { username, password },
            method: 'POST',
            path: '/auth',
        }, true);

        if (result.success) {
            this._onSuccess();
            setTimeout(() => {
                this._window?.close();
            }, 2000);
        } else {
            e.sender.send('authentication-error', result.error || 'Authentication Error');
        }
    }

    protected _createWindow = () => {
        this._window = new Window({
            backgroundColor: bgColor,
            display: 'cursor',
            filename: path.resolve(__dirname, 'login.html'),
            height: 250,
            width: 370,
            webPreferences: {
                devTools: process.env.NODE_ENV === 'development',
                preload: path.resolve(__dirname, 'loginPreloader.js'),
            },
            onClosed: () => {
                this._shutdownListeners();
                this._onCloseCallback?.();
            },
        });

        this._isOpen = true;
    }

    private _setListeners = () => {
        this.__setListeners();
        ipcMain.on('close-login-window', this._window?.close);
        ipcMain.on('authenticate', this._authenticate);
        ipcMain.on('login-loaded', this._onLoad);
    }

    private _shutdownListeners = () => {
        this.__shutdownListeners();
        ipcMain.off('close-login-window', this._window?.close);
        ipcMain.off('authenticate', this._authenticate);
        ipcMain.off('login-loaded', this._onLoad);
    }

    private verifyToken = async () => {
        const result = await this.webServiceHelper.sendRequest({
            method: 'POST',
            path: '/auth/verify-token',
        });

        if (result.success) {
            this._onSuccess();
        } else {
            this._createWindow();
            this._setListeners();
        }
    }
}
