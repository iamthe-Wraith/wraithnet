import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DnDDate } from "../../lib/dndDate";
import { BaseModel } from "../base";
import { CampaignDailyChecklistModel } from "./daily-checklist";
import { IPCRef, PCModel } from "./pc";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_currentDate' |
    '_dailyChecklist' |
    '_pcs' |
    '_startDate';

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: CampaignDailyChecklistModel = null;
    private _currentDate: DnDDate = null;
    private _pcs: PCModel[] = [];
    private _startDate: DnDDate = null;
    public loadingPCs = false;
    public creatingPC = false;
    
    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _currentDate: observable,
            _dailyChecklist: observable,
            _pcs: observable,
            _startDate: observable,
            creatingPC: observable,
            loadingPCs: observable,
            busy: computed,
            createdAt: computed,
            currentDate: computed,
            dailyChecklist: computed,
            pcs: computed,
            startDate: computed,
            id: computed,
            name: computed,
            loadPCs: action.bound,
        });

        this._campaign = campaign;
        this._dailyChecklist = new CampaignDailyChecklistModel(campaign);
        this._startDate = new DnDDate(campaign.startDate);
        this._currentDate = new DnDDate(campaign.currentDate);
    }

    get busy() { return this._busy }
    get createdAt() { return this._campaign.createdAt }
    get dailyChecklist() { return this._dailyChecklist }
    get id() { return this._campaign.id }
    get name() { return this._campaign.name }
    get startDate() { return this._startDate }
    get currentDate() { return this._currentDate }
    get pcs() { return this._pcs }

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
}