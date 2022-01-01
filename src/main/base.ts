import { WraithnetApiWebServiceHelperNode } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelperNode";
import Window from '../lib/window';

export interface IBaseProps {
    isDev?: boolean;
    onClose?: () => void;
}

export abstract class Base {
    protected _isDev: boolean;
    protected _isOpen: boolean;
    protected _onCloseCallback: () => void;
    protected _webServiceHelper: WraithnetApiWebServiceHelperNode;
    protected _window: Window;
    protected _windowName: string;

    constructor({ isDev, onClose }: IBaseProps) {
        this._isDev = isDev;
        this._isOpen = false;
        this._onCloseCallback = onClose;
    }

    get isOpen () {
        return this._isOpen;
    }

    public close = () => {
        if (this._isOpen && !!this._window) {
            this._window?.close();
            this._window = null;
            this._isOpen = false;
        } else {
            console.log(`close called but ${ this._windowName } window ${ !this._isOpen ? 'is not open' : 'object does not exist' }`);
        }
    }

    public abstract init: () => void;
    protected abstract _createWindow: () => void;
    
    public send = (channel: string, data: any) => {
        this._window?.send(channel, data);
    }

    get webServiceHelper() {
        if (!this._webServiceHelper) {
            // only want to instantiate object when used...
            this._webServiceHelper = new WraithnetApiWebServiceHelperNode();
            this._webServiceHelper.initClient();
        }
    
        return this._webServiceHelper;
    }
}