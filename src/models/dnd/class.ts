import { action, computed, makeObservable, observable } from "mobx";
import { BaseModel } from "../base";

type PrivateFields = '_busy' |
'_class' |
'_setClass';

export interface IDnDClass {
  id: string;
  name: string;
}

export class DnDClassModel extends BaseModel {
  private _busy = false;
  private _class: IDnDClass = null;

  constructor(race: IDnDClass) {
    super();
    makeObservable<DnDClassModel, PrivateFields>(this, {
      _busy: observable,
      _class: observable,
      id: computed,
      name: computed,
      _setClass: action.bound,
    });

    this._setClass(race);
  }

  get busy() { return this._busy; }
  get id() { return this._class.id; }
  get name() { return this._class.name; }

  private _setClass = (c: IDnDClass) => {
    this._class = c;
  }
}