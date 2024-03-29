import path from 'path';
import { ipcMain } from 'electron';

import Window from '../lib/window';
import { Base, IBaseProps } from './base';

interface IProps extends IBaseProps {
    isDev: boolean;
}

export class DnD extends Base {
    constructor(props: IProps) {
        super(props);
        this._windowName = 'login';
    }

    public init = async () => {

        if (this._window) {
            this._window.focus();
        } else {
            this._createWindow();
            this._setListeners();
        }
    }

    protected _createWindow = () => {
        this._window = new Window({
            backgroundColor: '#000',
            display: 'cursor',
            filename: path.resolve(__dirname, 'dnd.html'),
            height: 'full',
            width: 'full',
            webPreferences: {
                devTools: true, // process.env.NODE_ENV === 'development',
                preload: path.resolve(__dirname, 'dndPreloader.js'),
            },
            onClosed: () => {
                this._shutdownListeners();
            },
        });

        this._isOpen = true;
    }

    private _setListeners = () => {
        this.__setListeners();
        ipcMain.on('close-dnd', this.close);
    }

    private _shutdownListeners = () => {
        this.__shutdownListeners();
        ipcMain.off('close-dnd', this.close);
    }
}
