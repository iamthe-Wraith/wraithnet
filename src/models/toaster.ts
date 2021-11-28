import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from './base';

type PrivateFields = '_busy' |
'_currentToast' |
'_pop' |
'_showNext' |
'_toasts';

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface IToastMessage {
  delay?: number;
  message: string;
  type?: ToastType;
}

export class ToasterModel extends BaseModel {
  private _busy = false;
  private _currentToast: IToastMessage = null;
  private _toasts: IToastMessage[] = [];
  private _timer: number = null;
  private _delay = 5000; // 5s default

  constructor () {
    super();
    makeObservable<ToasterModel, PrivateFields>(this, {
      _busy: observable,
      _currentToast: observable,
      _toasts: observable,
      busy: computed,
      currentToast: computed,
      toasts: computed,
      _pop: action.bound,
      _showNext: action.bound,
      push: action.bound,
    });
  }

  get busy() { return this._busy; }
  get currentToast() {
    return this._currentToast;
  }
  get toasts() { return this._toasts; }

  public push = (toastMessage: IToastMessage) => {
    this._toasts = [...this._toasts, toastMessage];
    this._showNext();
  }

  private _pop = () => {
    if (this._toasts.length > 0) {
      // get the first message
      const first = this._toasts[0];

      // remove it from the queue and update the queue ref
      const toasts = this._toasts.slice();
      toasts.splice(0, 1);
      this._toasts = toasts;

      return first;
    }
    return null;
  }

  private _showNext = () => {
    if (!this._timer) {
      const nextMessage = this._pop();
      if (nextMessage) {
        this._currentToast = nextMessage;
        this._timer = window.setTimeout(() => {
          runInAction(() => {
            this._timer = null;
            this._currentToast = null;
            this._showNext();
          });
        }, (this._currentToast.delay || this._delay));
      }
    }
  }
}
