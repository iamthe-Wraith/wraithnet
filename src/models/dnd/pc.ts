import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "../base";
import { INote, INoteRef, NoteModel } from "../notes";
import { IDnDClass } from "./class";
import { IDnDRace } from "./race";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_inventory' |
    '_leveledUp' |
    '_loadingInventory' |
    '_note' |
    '_pc' |
    '_updatingExp' |
    '_updatingInventory';

export interface IPCRef {
    id: string;
    owner: string;
    campaignId: string;
    name: string;
    note: INote;
    race: IDnDRace;
    classes: IDnDClass[];
    age: number;
    exp: number;
    expForNextLevel: number;
    level: number;
}

export interface IPC extends IPCRef {
    // events
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
    private _note: NoteModel = null;
    private _inventory: NoteModel[] = null;
    private _pc: IPCRef = null;
    private _updatingExp = false;
    private _leveledUp = false;
    private _loadingInventory = false;
    private _updatingInventory = false;

    constructor(campaign: ICampaign, pc: IPCRef) {
        super();
        makeObservable<PCModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _inventory: observable,
            _leveledUp: observable,
            _loadingInventory: observable,
            _note: observable,
            _pc: observable,
            _updatingExp: observable,
            _updatingInventory: observable,
            id: computed,
            inventory: computed,
            leveledUp: computed,
            loadingInventory: computed,
            name: computed,
            note: computed,
            updatingExp: computed,
            updatingInventory: computed,
            loadInventory: action.bound,
            resetLeveledUp: action.bound,
            setPc: action.bound,
            update: action.bound,
            updateExp: action.bound,
            updateInventory: action.bound,
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
    get inventory() { return this._inventory || [] };
    get level() { return this._pc.level }
    get loadingInventory() { return this._loadingInventory }
    get note() { return this._note }
    get updatingExp() { return this._updatingExp }
    get updatingInventory() { return this._updatingInventory }
    get leveledUp() { return this._leveledUp }
    set leveledUp(value: boolean) { this._leveledUp = value } 

    public loadInventory = async () => {
        if (!this.loadingInventory) {
            this._loadingInventory = true;

            const result = await this.webServiceHelper.sendRequest<INoteRef[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc/${ this._pc.id }/inventory`),
                method: 'GET',
            });

            if (result.success) {
                runInAction(() => {
                    this._inventory = result.value.map(note => new NoteModel(note));
                    this._loadingInventory = false;
                }); 
            } else {
                runInAction(() => {
                    this._loadingInventory = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public resetLeveledUp = () => {
        this._leveledUp = false;
    }

    public setPc = (pc: IPCRef) => {
        this._pc = pc;
        this._note = new NoteModel(pc.note);
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

    public updateInventory = async (items: string[]) => {
        if (!this._updatingInventory) {
            this._updatingInventory = true;

            const result = await this.webServiceHelper.sendRequest<INoteRef[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc/${ this._pc.id }/inventory`),
                method: 'PUT',
                data: { items },
            });
    
            if (result.success) {
                runInAction(() => {
                    this._inventory = result.value.map(note => new NoteModel(note));
                    this._updatingInventory = false;
                }); 
            } else {
                runInAction(() => {
                    this._updatingInventory = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}