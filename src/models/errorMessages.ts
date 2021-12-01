import { action, computed, makeObservable, observable } from 'mobx';
import { BaseModel } from './base';

type PrivateFields = '_busy' |
'_currentErrorMessage' |
'_pop' |
'_showNext' |
'_errorMessages';

export interface IErrorMessage {
  title?: string;
  message: string;
}

export class ErrorMessagesModel extends BaseModel {
  private _busy = false;
  private _currentErrorMessage: IErrorMessage = null;
  private _errorMessages: IErrorMessage[] = [];

  constructor () {
    super();
    makeObservable<ErrorMessagesModel, PrivateFields>(this, {
      _busy: observable,
      _currentErrorMessage: observable,
      _errorMessages: observable,
      busy: computed,
      currentErrorMessage: computed,
      _pop: action.bound,
      _showNext: action.bound,
      push: action.bound,
      resolveCurrentMessage: action.bound,
    });
  }

  get busy() { return this._busy; }
  get currentErrorMessage() { return this._currentErrorMessage; }

  public push = (errorMessage: IErrorMessage) => {
    this._errorMessages = [...this._errorMessages, errorMessage];
    this._showNext();
  }

  public resolveCurrentMessage = () => {
    this._currentErrorMessage = null;
    this._showNext();
  }

  private _pop = () => {
    if (this._errorMessages.length > 0) {
      // get the first message
      const first = this._errorMessages[0];

      // remove it from the queue and update the queue ref
      const errorMessages = this._errorMessages.slice();
      errorMessages.splice(0, 1);
      this._errorMessages = errorMessages;

      return first;
    }
    return null;
  }

  private _showNext = () => {
    const nextErrorMessage = this._pop();
    if (nextErrorMessage) this._currentErrorMessage = nextErrorMessage;
  }
}
