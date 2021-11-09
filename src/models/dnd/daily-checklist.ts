import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { IBase } from "../../types";
import { BaseModel } from "../base";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_items' |
    '_deletingItemId' |
    '_updatingItemId' |
    '_setCampaign' |
    '_addingItem';

export interface IDailyChecklistItem extends IBase {
    text: string;
    details?: string;
    order?: number;
}

export class CampaignDailyChecklistModel extends BaseModel {
    private _busy = false;
    private _addingItem = false;
    private _deletingItemId: string = null;
    private _updatingItemId: string = null;
    private _campaign: ICampaign = null;
    private _items: IDailyChecklistItem[] = [];

    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignDailyChecklistModel, PrivateFields>(this, {
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