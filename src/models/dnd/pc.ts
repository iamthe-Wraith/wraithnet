import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "../base";
import { IDnDClass } from "./class";
import { IDnDRace } from "./race";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_pc' |
    '_setPc';

export interface IPCRef {
    id: string;
    owner: string;
    campaignId: string;
    name: string;
    race: IDnDRace;
    classes: IDnDClass[];
    age: number;
    exp: number;
    expForNextLevel: number;
    level: number;
}

export interface IPC extends IPCRef {
    note?: string;
    // events
    // inventory
    // contacts
}

export class PCModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _pc: IPCRef = null;

    constructor(campaign: ICampaign, pc: IPCRef) {
        super();
        makeObservable<PCModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _pc: observable,
            id: computed,
            name: computed,
            _setPc: action.bound,
            update: action.bound,
        });

        this._campaign = campaign;
        this._setPc(pc);
    }

    get busy() { return this._busy }
    get campaignId() { return this._pc.campaignId }
    get id() { return this._pc.id }
    get name() { return this._pc.name }
    get owner() { return this._pc.owner }
    get race() { return this._pc.race }
    get classes() { return this._pc.classes }
    get age() { return this._pc.age }
    get exp() { return this._pc.exp }
    get expForNextLevel() { return this._pc.expForNextLevel }
    get level() { return this._pc.level }

    public update = async (name: string, race: string, classes: string[], age: number, exp: number, level: number) => {
        if (!this._busy) {
            this._busy = true;

            const data = {
                name,
                race,
                classes,
                age,
                exp,
                level
            };

            const result = await this.webServiceHelper.sendRequest<IPCRef>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc/${ this._pc.id }`),
                method: 'PATCH',
                data,
            });
    
            if (result.success) {
                runInAction(() => {
                    this._pc = result.value;
                    this._busy = false;
                }); 
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    private _setPc = (pc: IPCRef) => {
        this._pc = pc;
    }
}