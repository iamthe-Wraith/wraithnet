import { action, computed, makeObservable, observable } from 'mobx';
import { DnDDate } from '../../lib/dndDate';
import { BaseModel } from '../base';

type PrivateFields = '_busy' |
'_date' |
'_event' |
'_setEvent';

export interface IDnDEvent {
    campaignId: string;
    createdAt: string;
    date: string;
    description: string;
    id: string;
    owner: string;
}

export class EventModel extends BaseModel {
    private _busy = false;
    private _event: IDnDEvent = null;
    private _date: DnDDate = null;

    constructor (evt: IDnDEvent) {
        super();
        makeObservable<EventModel, PrivateFields>(this, {
            _busy: observable,
            _date: observable,
            _event: observable,
            busy: computed,
            date: computed,
            description: computed,
            id: computed,
            _setEvent: action.bound,
        });
        
        this._setEvent(evt);
    }

    get busy() { return this._busy; }
    get date() { return this._date; }
    get description() { return this._event.description; }
    get id() { return this._event.id; }

    private _setEvent = (evt: IDnDEvent) => {
        this._event = evt;
        this._date = new DnDDate(evt.date);
    }
}
