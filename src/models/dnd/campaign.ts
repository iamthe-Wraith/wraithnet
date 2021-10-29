import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DnDDate } from "../../lib/dndDate";
import { BaseModel } from "../base";
import { CollectionModel } from "../collection";
import { INote, INoteRef, NoteModel } from "../notes";
import { CampaignDailyChecklistModel } from "./daily-checklist";
import { IExpResponse, IPCRef, PCModel } from "./pc";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_currentDate' |
    '_dailyChecklist' |
    '_pcs' |
    '_sessions' |
    '_startDate';

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: CampaignDailyChecklistModel = null;
    private _currentDate: DnDDate = null;
    private _pcs: PCModel[] = [];
    private _sessions: CollectionModel<INoteRef, NoteModel> = null;
    private _startDate: DnDDate = null;
    public loadingPCs = false;
    public creatingPC = false;
    public updatingPartyXP = false;
    
    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _currentDate: observable,
            _dailyChecklist: observable,
            _pcs: observable,
            _sessions: observable,
            _startDate: observable,
            creatingPC: observable,
            loadingPCs: observable,
            updatingPartyXP: observable,
            busy: computed,
            createdAt: computed,
            currentDate: computed,
            dailyChecklist: computed,
            pcs: computed,
            sessions: computed,
            startDate: computed,
            id: computed,
            name: computed,
            createSession: action.bound,
            loadPCs: action.bound,
        });

        this._campaign = campaign;
        this._dailyChecklist = new CampaignDailyChecklistModel(campaign);
        this._startDate = new DnDDate(campaign.startDate);
        this._currentDate = new DnDDate(campaign.currentDate);
        this._sessions = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/session`),
            (note: INoteRef) => new NoteModel(note)
        )
    }

    get busy() { return this._busy }
    get createdAt() { return this._campaign.createdAt }
    get dailyChecklist() { return this._dailyChecklist }
    get id() { return this._campaign.id }
    get name() { return this._campaign.name }
    get startDate() { return this._startDate }
    get currentDate() { return this._currentDate }
    get pcs() { return this._pcs }
    get sessions() { return this._sessions }

    public createPC = async (
        name: string,
        race: string,
        classes: string[],
        age: number,
        exp: number,
        level: number,
    ) => {
        if (!this.creatingPC) {
            this.creatingPC = true;

            const data = {
                name,
                race,
                classes,
                age,
                exp,
                level
            };

            const result = await this.webServiceHelper.sendRequest<IPCRef>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc`),
                method: 'POST',
                data,
            });
    
            if (result.success) {
                runInAction(() => {
                    const newPC = new PCModel(this._campaign, result.value);
                    this._pcs = [newPC, ...this._pcs];
                    this.creatingPC = false;
                }); 
            } else {
                runInAction(() => {
                    this.creatingPC = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createSession = async () => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/session`),
                method: 'POST',
            });

            if (result.success) {
                await this._sessions.refresh();
                runInAction(() => {    
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

    public loadPCs = async () => {
        if (!this.loadingPCs) {
            this.loadingPCs = true;

            const result = await this.webServiceHelper.sendRequest<IPCRef[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc`),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._pcs = result.value.map(pc => new PCModel(this._campaign, pc));
                    this.loadingPCs = false;
                }); 
            } else {
                runInAction(() => {
                    this.loadingPCs = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public updatePartyXP = async (value: string) => {
        if (!this.updatingPartyXP) {
            this.updatingPartyXP = true;

            const result = await this.webServiceHelper.sendRequest<{pc: IPCRef, exp: IExpResponse}[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/party-exp`),
                method: 'PATCH',
                data: { exp: value },
            });
    
            if (result.success) {
                runInAction(() => {
                    result.value.forEach(x => {
                        const pc = this._pcs.find(p => p.id === x.pc.id);
                        if (pc) {
                            pc.setPc(x.pc);
                            pc.leveledUp = x.exp.leveledUp;
                        }
                    });

                    this.updatingPartyXP = false;
                }); 
            } else {
                runInAction(() => {
                    this.updatingPartyXP = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}