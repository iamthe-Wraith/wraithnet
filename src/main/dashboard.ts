import { ipcMain } from 'electron';
import path from 'path';

import Window from '../lib/window';
import { Base, IBaseProps } from './base';

export class Dashboard extends Base {
    constructor(props: IBaseProps) {
        super(props);
        this._windowName = 'dashboard';
    }

    protected _createWindow = () => {
        this._window = new Window({
            backgroundColor: '#000',
            display: 'cursor',
            filename: path.resolve(__dirname, 'dashboard.html'),
            height: 'full',
            width: 'full',
            webPreferences: {
                devTools: process.env.NODE_ENV === 'development',
                preload: path.resolve(__dirname, 'dashboardPreloader.js'),
            },
            onClosed: () => {
                this._shutdownListeners();
                this._onCloseCallback?.();
            },
        });

        this._isOpen = true;
    }

    public init = () => {
        this._createWindow();
        this._setListeners();
    }

    private _onDashboardInit = () => {
        try {
            this._window.send('dashboard-init', true);
        } catch (err) {
            console.log('dashboardInit error', err);
        }
    };

    private _setListeners = () => {
        ipcMain.on('close-dashboard', this.close);
        ipcMain.on('dashboard-init', this._onDashboardInit);
    }

    private _shutdownListeners = () => {
        ipcMain.off('close-dashboard', this.close);
        ipcMain.off('dashboard-init', this._onDashboardInit);
    }
}