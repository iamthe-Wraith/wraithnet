import { ipcMain } from 'electron';
import path from 'path';
import { Themes } from '../constants';
import { updateWraithnetConfig } from '../lib/config';

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

    private _focus = () => this._window.focus();

    private _onDashboardInit = () => {
        try {
            this._window.send('dashboard-init', true);
        } catch (err) {
            console.log('dashboardInit error', err);
        }
    };

    private _onUpdateTheme = (_: Electron.IpcMainEvent, newTheme: Themes) => {
        updateWraithnetConfig({ theme: newTheme });
        this._broadcast('theme-updated');
    }

    private _setListeners = () => {
        this.__setListeners();
        ipcMain.on('close-dashboard', this.close);
        ipcMain.on('focus-dashboard', this._focus);
        ipcMain.on('dashboard-init', this._onDashboardInit);
        ipcMain.on('update-theme', this._onUpdateTheme);
    }

    private _shutdownListeners = () => {
        this.__shutdownListeners();
        ipcMain.off('close-dashboard', this.close);
        ipcMain.off('focus-dashboard', this._focus);
        ipcMain.off('dashboard-init', this._onDashboardInit);
        ipcMain.off('update-theme', this._onUpdateTheme);
    }
}