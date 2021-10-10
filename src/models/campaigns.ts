import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IBase } from "../types";
import { BaseModel } from "./base";

type PrivateFields = '_busy' |
    '_campaign' |
    '_campaigns';

type CampaignPrivateFields = '_busy' |
    '_campaign' |
    '_dailyChecklist' |
    '_gettingDailyChecklist';

export interface ICampaign extends IBase {
    name: string;
}

export interface IDailyChecklistItem extends IBase {
    text: string;
    details?: string;
    order?: number;
}

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: IDailyChecklistItem[] = [];
    private _gettingDailyChecklist = false;

    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, CampaignPrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _dailyChecklist: observable,
            _gettingDailyChecklist: observable,
            busy: computed,
            createdAt: computed,
            dailyChecklist: computed,
            gettingDailyChecklist: computed,
            id: computed,
            name: computed,
            getDailyChecklist: action.bound,
        });

        this._campaign = campaign;
    }

    get busy() { return this._busy }
    get createdAt() { return this._campaign.createdAt }
    get dailyChecklist() { return this._dailyChecklist }
    get gettingDailyChecklist() { return this._gettingDailyChecklist }
    get id() { return this._campaign.id }
    get name() { return this._campaign.name }

    public getDailyChecklist = async () => {
        if (!this._gettingDailyChecklist) {
            this._gettingDailyChecklist = true;

            const result = await this.webServiceHelper.sendRequest<IDailyChecklistItem[]>({
                path: this.composeUrl(`/dnd/${this.id}/daily-checklist`),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._busy = false;
                    this._dailyChecklist = result.value;
                }); 
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}

export class CampaignsModel extends BaseModel {
    private _busy = false;
    private _campaign: CampaignModel = null;
    private _campaigns: ICampaign[] = [];


    constructor() {
        super();
        makeObservable<CampaignsModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _campaigns: observable,
            busy: computed,
            campaign: computed,
            campaigns: computed,
            getCampaigns: action.bound,
            setCampaign: action.bound,
        });
    }

    get busy () {
        return this._busy;
    }

    get campaign() {
        return this._campaign;
    }

    get campaigns() {
        return this._campaigns;
    }

    public getCampaigns = async () => {
        if (!this._busy) {
            this._busy = true;
    
            const result = await this.webServiceHelper.sendRequest<ICampaign[]>({
                path: this.composeUrl('/dnd'),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._busy = false;
                    this._campaigns = result.value;
                }); 
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public setCampaign = (campaign: ICampaign) => {
        this._campaign = new CampaignModel(campaign);
    }
}
