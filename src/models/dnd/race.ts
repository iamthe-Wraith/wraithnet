import { action, computed, makeObservable, observable } from "mobx";
import { BaseModel } from "../base";

type PrivateFields = '_busy' |
    '_race' |
    '_setRace';

export interface IDnDRace {
    id: string;
    name: string;
}

export class DnDRaceModel extends BaseModel {
    private _busy = false;
    private _race: IDnDRace = null;

    constructor(race: IDnDRace) {
        super();
        makeObservable<DnDRaceModel, PrivateFields>(this, {
            _busy: observable,
            _race: observable,
            id: computed,
            name: computed,
            _setRace: action.bound,
        });

        this._setRace(race);
    }

    get busy() { return this._busy }
    get id() { return this._race.id }
    get name() { return this._race.name }

    private _setRace = (race: IDnDRace) => {
        this._race = race;
    }
}