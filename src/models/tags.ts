import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { computed, makeObservable, observable } from "mobx";

dayjs.extend(timezone);

export interface ITag {
    createdAt: string;
    id: string;
    owner: string;
    text: string;
}

type PrivateFields = '_tag';

export class TagModel {
    private _tag: ITag = null;
    constructor(tag: ITag) {
        makeObservable<TagModel, PrivateFields>(this, {
            _tag: observable,
            id: computed,
            text: computed,
            createdAt: computed,
            owner: computed,
        });

        this._tag = tag;
    }

    get id() {
        return this._tag.id;
    }

    get text() {
        return this._tag.text;
    }

    get createdAt() {
        return dayjs(this._tag.createdAt).local().format();
    }

    get owner() {
        return this._tag.owner;
    }
}
