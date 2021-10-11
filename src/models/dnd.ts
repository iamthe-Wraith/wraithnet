import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IBase } from "../types";
import { BaseModel } from "./base";

type PrivateFields = '_busy' |
    '_campaign' |
    '_campaigns';

type CampaignPrivateFields = '_busy' |
    '_campaign' |
    '_dailyChecklist';

type CampaignDailyChecklistPrivateFields = '_busy' |
    '_campaign' |
    '_items' |
    '_deletingItemId' |
    '_updatingItemId' |
    '_setCampaign' |
    '_addingItem';

export interface ICampaign extends IBase {
    name: string;
}

export interface IDailyChecklistItem extends IBase {
    text: string;
    details?: string;
    order?: number;
}

class CampaignDailyChecklistModel extends BaseModel {
    private _busy = false;
    private _addingItem = false;
    private _deletingItemId: string = null;
    private _updatingItemId: string = null;
    private _campaign: ICampaign = null;
    private _items: IDailyChecklistItem[] = [];

    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignDailyChecklistModel, CampaignDailyChecklistPrivateFields>(this, {
            _addingItem: observable,
            _busy: observable,
            _deletingItemId: observable,
            _campaign: observable,
            _items: observable,
            _updatingItemId: observable,
            isAddingItem: computed,
            isBusy: computed,
            items: computed,
            updatingItemId: computed,
            addItem: action.bound,
            delete: action.bound,
            load: action.bound,
            update: action.bound,
            _setCampaign: action.bound,
        });

        this._setCampaign(campaign);
    }

    get deletingItemId() {
        return this._deletingItemId;
    }

    get isAddingItem() {
        return this._addingItem;
    }

    get isBusy() {
        return this._busy;
    }

    get items() {
        return this._items || [];
    }

    get updatingItemId() {
        return this._updatingItemId;
    }

    public addItem = async (newItem: IDailyChecklistItem) => {
        if (!this._addingItem) {
            this._addingItem = true;

            const result = await this.webServiceHelper.sendRequest<IDailyChecklistItem>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/daily-checklist`),
                method: 'POST',
                data: newItem,
            });
    
            if (result.success) {
                runInAction(() => {
                    this._addingItem = null;
                    this._items = this._sort([ ...this._items, result.value ]);
                }); 
            } else {
                runInAction(() => {
                    this._addingItem = null;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public delete = async (item: IDailyChecklistItem) => {
        if (!this._deletingItemId) {
            this._deletingItemId = item.id;

            const result = await this.webServiceHelper.sendRequest<void>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/daily-checklist/${ item.id }`),
                method: 'DELETE',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._deletingItemId = null;
                    this._items = this._items.filter(i => i.id !== item.id);
                }); 
            } else {
                runInAction(() => {
                    this._deletingItemId = null;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public load = async () => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<IDailyChecklistItem[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/daily-checklist`),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._busy = false;
                    this._items = this._sort(result.value);
                }); 
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public update = async (item: IDailyChecklistItem) => {
        if (!this._updatingItemId) {
            this._updatingItemId = item.id;

            const result = await this.webServiceHelper.sendRequest<IDailyChecklistItem>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/daily-checklist/${item.id}`),
                method: 'PATCH',
                data: { ...item },
            });
    
            if (result.success) {
                runInAction(() => {
                    this._updatingItemId = null;
                    this._items = this._items.map(i => i.id === item.id ? result.value : i);
                }); 
            } else {
                runInAction(() => {
                    this._updatingItemId = null;
                });
                
                throw new Error(result.error);
            }
        }
    }

    private _setCampaign = (campaign: ICampaign) => {
        this._campaign = campaign;
    }

    private _sort = (items: IDailyChecklistItem[]) => {
        return items.sort((x, y) => {
            if (x.order < y.order) {
                return -1;
            } else if (x.order > y.order) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: CampaignDailyChecklistModel = null;

    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, CampaignPrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _dailyChecklist: observable,
            busy: computed,
            createdAt: computed,
            dailyChecklist: computed,
            id: computed,
            name: computed,
        });

        this._campaign = campaign;
        this._dailyChecklist = new CampaignDailyChecklistModel(this._campaign);
    }

    get busy() { return this._busy }
    get createdAt() { return this._campaign.createdAt }
    get dailyChecklist() { return this._dailyChecklist }
    get id() { return this._campaign.id }
    get name() { return this._campaign.name }
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

    public forceSelect = () => {
        this._campaign = new CampaignModel(this.campaigns[0]);
    }
}
