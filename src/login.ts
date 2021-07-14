import path from 'path';
import keytar from 'keytar';
import { ipcMain } from 'electron';

import Window from './lib/window';
import { IpcMainEvent } from 'electron/main';
import { WraithnetApiWebServiceHelper } from './lib/webServiceHelpers/wraithnetApiWebServiceHelper';

const bgColor = '#000';

interface IProps {
  isDev: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

class Auth {
  private _isDev: boolean;
  private _window: Window;
  private _onSuccess: () => void;
  private _onClose: () => void;
  private _webServiceHelper: WraithnetApiWebServiceHelper;
  private _authToken: string;

  constructor(props: IProps) {
    this._isDev = props.isDev;
    this._onSuccess = props.onSuccess;
    this._onClose = props.onClose;
  }

  get webServiceHelper() {
    if (!this._webServiceHelper) {
      // only want to instantiate object when used...
      this._webServiceHelper = new WraithnetApiWebServiceHelper();
      this._webServiceHelper.initClient();
    }

    return this._webServiceHelper;
  }

  public init = async () => new Promise((resolve, reject) => {
    keytar.getPassword('wraithnet', 'wraithnet')
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
    const result = await this.webServiceHelper.sendRequest({
      data: { username, password },
      method: 'POST',
      path: '/auth'
    }, true);

    if (result.success) {
      this._onSuccess();
      this._window.close();
    } else {
      throw new Error(result.value.message);
    }
  }

  private createWindow = () => {
    this._window = new Window({
      backgroundColor: bgColor,
      display: 'cursor',
      filename: path.resolve('.', 'dist', 'login.html'),
      height: 250,
      width: 370,
      resizable: this._isDev,
      webPreferences: {
        preload: path.resolve(__dirname, 'loginPreloader.js'),
      },
      onClosed: () => {
        this._window = null;
        this._onClose();
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
        } catch (err) {
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

export const createLoginWindow = async (onClose: () => void, onSuccess: () => void, isDev: boolean) => {
  const login = new Auth({ isDev, onSuccess, onClose });
  login.init();
}
