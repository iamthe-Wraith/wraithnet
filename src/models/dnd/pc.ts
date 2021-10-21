import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "../base";
import { IDnDClass } from "./class";
import { IDnDRace } from "./race";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_leveledUp' |
    '_pc' |
    '_updatingExp';

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

export interface IExpResponse {
    exp: number;
    expForNextLevel: number;
    level: number;
    leveledUp: boolean;
}

export class PCModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _pc: IPCRef = null;
    private _updatingExp = false;
    private _leveledUp = false;

    constructor(campaign: ICampaign, pc: IPCRef) {
        super();
        makeObservable<PCModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _leveledUp: observable,
            _pc: observable,
            _updatingExp: observable,
            id: computed,
            leveledUp: computed,
            name: computed,
            updatingExp: computed,
            setPc: action.bound,
            resetLeveledUp: action.bound,
            update: action.bound,
            updateExp: action.bound,
        });

        this._campaign = campaign;
        this.setPc(pc);
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
    get updatingExp() { return this._updatingExp }
    get leveledUp() { return this._leveledUp }
    set leveledUp(value: boolean) { this._leveledUp = value } 

    public resetLeveledUp = () => {
        this._leveledUp = false;
    }

    public setPc = (pc: IPCRef) => {
        this._pc = pc;
    }

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

    public updateExp = async (value: string) => {
        if (!this._updatingExp) {
            this._updatingExp = true;

            const result = await this.webServiceHelper.sendRequest<IExpResponse>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc/${ this._pc.id }/exp`),
                method: 'PATCH',
                data: { exp: value },
            });
    
            if (result.success) {
                runInAction(() => {
                    const { exp, expForNextLevel, level, leveledUp } = result.value;
                    this._pc.exp = exp;
                    this._pc.level = level;
                    this._pc.expForNextLevel = expForNextLevel;
                    this._leveledUp = leveledUp;
                    this._updatingExp = false;
                }); 
            } else {
                runInAction(() => {
                    this._updatingExp = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}