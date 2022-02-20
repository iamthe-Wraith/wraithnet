import dayjs from 'dayjs';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from './base';

type PrivateFields = '_busy' |
'_init' |
'_now';

export class TimeModel extends BaseModel {
    private _busy = false;
    private _now = dayjs().local();
    private _interval: number = null;

    constructor () {
        super();
        makeObservable<TimeModel, PrivateFields>(this, {
            _busy: observable,
            _now: observable,
            busy: computed,
            now: computed,
            _init: action.bound,
        });

        this._init();
    }

    get busy() { return this._busy; }
    get now() { return this._now; }

    private _init = () => {
        this._interval = window.setInterval(() => {
            const nextTime = dayjs().local();

            if (this._now.date() !== nextTime.date()) {
                window.dispatchEvent(new CustomEvent('new-day'));
            }

            runInAction(() => {
                this._now = nextTime;
            });
        }, 1000);
    }
}
