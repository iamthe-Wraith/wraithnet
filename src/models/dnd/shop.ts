import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from '../base';

type PrivateFields = '_busy' |
'_items' |
'_magicItems';

type StoreMagicItemPrivateFields = '_busy' |
'_item';

export interface IItemInit {
    index: string;
    name: string;
}

export interface IItemBase extends IItemInit {
    url: string;
    source: string;
    isMagicItem?: boolean;
    quantity?: number;
}

export interface IReference extends IItemBase {
    type: string;
}

export interface IChoice<T> {
    choose: number;
    type: string;
    from: T[];
}

export interface ICost {
    quantity: number;
    unit: string;
}

export interface IDamage {
    damage_dice: string;
    damage_type: IItemBase;
}

export interface IRange {
    normal: number;
    long: number;
}

export interface IArmorClass {
    base: number;
    dex_bonus: boolean;
    max_bonus: number;
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
export interface IRarities {
    legendary: boolean;
    very_rare: boolean;
    rare: boolean;
    common: boolean;
    uncommon: boolean;
    varies: boolean;
    unknown: boolean;
}

export interface IContents {
    item: IItemBase;
    quantity: number;
}

export interface ISpeed {
    quantity: number;
    unit: string;
}

export interface IStoreItemRef extends IItemInit {
    id: string;
    cost: ICost;
}

export interface IStoreItem extends IItemBase {
    id: string;
    armor_category?: string;
    armor_class?: IArmorClass;
    capacity?: string;
    category_range?: string;
    contents?: IContents[];
    cost: ICost;
    damage?: IDamage;
    desc: string[];
    equipment_category: IItemBase;
    gear_category?: IItemBase;
    properties?: IItemBase[];
    range?: IRange;
    special?: string[];
    speed?: ISpeed;
    stealth_disadvantage?: boolean;
    str_minimum?: number;
    throw_range?: IRange;
    tool_category?: string;
    two_handed_damage?: IDamage;
    vehicle_category?: string;
    weapon_category?: string;
    weapon_range?: string;
    weight: number;
}

export interface IStoreMagicItemRef extends IItemInit {
    id: string;
    rarity: Rarity;
}
export interface IStoreMagicItem extends IStoreMagicItemRef {
    equipment_category: IItemInit;
    desc: string[];
    
}

interface IStoreInventory {
    items: IStoreItemRef[];
    magicItems: IStoreMagicItemRef[];
}

export class StoreMagicItemModel extends BaseModel {
    private _busy = false;
    private _item:IStoreMagicItem = null;

    constructor (item: IStoreMagicItemRef) {
        super();
        makeObservable<StoreMagicItemModel, StoreMagicItemPrivateFields>(this, {
            _busy: observable,
            _item: observable,
            busy: computed,
            id: computed,
            index: computed,
            name: computed,
            rarity: computed,
            load: action.bound,
        });

        this._item = item as IStoreMagicItem;
    }

    get busy() { return this._busy; }
    get desc() { return this._item.desc || []; }
    get equipment_category() { return this._item.equipment_category || { name: 'unknown' }; }
    get id() { return this._item.id; }
    get index() { return this._item.index; }
    get name() { return this._item.name; }
    get rarity() { return this._item.rarity; }

    load = async () => {
        // do not load if is already busy or has already been loaded
        if (this._busy || !!this._item.desc) return;
        this._busy = true;

        const result = await this.webServiceHelper.sendRequest<IStoreMagicItem>({
            path: this.composeUrl(`/dnd/store-inventory/magic-item/${this.id}`),
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._item = result.value;
                this._busy = false;
            });

            return this._item;
        } else {
            runInAction(() => {
                this._busy = false;
            });
            
            throw new Error(result.error);
        }
    }
}

export class ShopModel extends BaseModel {
    private _busy = false;
    private _inventory: IStoreInventory = null;
    private _items: IStoreItemRef[] = [];
    private _magicItems: StoreMagicItemModel[] = [];

    constructor () {
        super();
        makeObservable<ShopModel, PrivateFields>(this, {
            _busy: observable,
            _items: observable,
            _magicItems: observable,
            busy: computed,
            items: computed,
            magicItems: computed,
            loadInventory: action.bound,
        });
    }

    get busy() { return this._busy; }
    get items() { return this._items; }
    get magicItems() { return this._magicItems; }

    loadInventory = async () => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<IStoreInventory>({
                path: this.composeUrl(`/dnd/store-inventory`),
                method: 'GET',
            });

            if (result.success) {
                runInAction(() => {
                    this._inventory = result.value;
                    this._items = result.value.items;
                    this._magicItems = result.value.magicItems.map(i => new StoreMagicItemModel(i));
                    this._busy = false;
                });

                return this._inventory;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}
