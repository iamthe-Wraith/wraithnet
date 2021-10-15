import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { DnDDate } from '../../lib/dndDate';
import { BaseModel } from '../base';
import { CampaignModel } from './campaign';
import { ICampaign } from './types';

type PrivateFields = '_busy' |
    '_campaign' |
    '_campaigns' |
    '_creating';

export class DnDModel extends BaseModel {
    private _busy = false;
    private _creating = false;
    private _campaign: CampaignModel = null;
    private _campaigns: ICampaign[] = [];


    constructor() {
        super();
        makeObservable<DnDModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _campaigns: observable,
            _creating: observable,
            busy: computed,
            campaign: computed,
            campaigns: computed,
            creating: computed,
            getCampaigns: action.bound,
            forceSelect: action.bound,
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

    get creating() {
        return this._creating;
    }

    public createCampaign = async (name: string, startDate: DnDDate) => {
        if (!this._busy) {
            this._busy = true;
    
            const result = await this.webServiceHelper.sendRequest<ICampaign>({
                path: this.composeUrl('/dnd'),
                method: 'POST',
                data: { name, startDate: startDate.stringify() }
            });
    
            if (result.success) {
                runInAction(() => {
                    this._busy = false;
                    this._campaigns = [...this._campaigns, result.value];
                }); 
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
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
        if (!campaign) {
            this._campaign = null;
            return;
        }
        
        this._campaign = new CampaignModel(campaign);
    }

    public forceSelect = () => {
        this._campaign = new CampaignModel(this.campaigns[0]);
    }
}
