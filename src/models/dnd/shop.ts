import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from '../base';

type PrivateFields = '_busy' |
'_inventory';

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
    equipment_category: IItemBase;
    desc: string[];
}

interface IStoreInventory {
    items: IStoreItemRef[];
    magicItems: IStoreMagicItemRef[];
}

export class ShopModel extends BaseModel {
    private _busy = false;
    private _inventory: IStoreInventory = null;

    constructor () {
        super();
        makeObservable<ShopModel, PrivateFields>(this, {
            _busy: observable,
            _inventory: observable,
            busy: computed,
            inventory: computed,
            loadInventory: action.bound,
        });
    }

    get busy() { return this._busy; }
    get inventory() { return this._inventory; }

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
