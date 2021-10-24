import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { action, computed, makeObservable, observable, runInAction, _allowStateChangesInsideComputed } from "mobx";
import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";
import { BaseModel } from "./base";

dayjs.extend(timezone);

export interface ITagsResponse {
    count: number;
    tags: ITag[];
}

export interface ITagQueryOptions {
    page?: number;
    text?: string;
}

export interface ITag {
    createdAt: string;
    id: string;
    owner: string;
    text: string;
}

type PrivateTagFields = '_tag';
type PrivateTagsFields = '_busy' | '_count' | '_criteria' | '_loaded' | '_page' | '_tags';

export class TagModel {
    private _tag: ITag = null;
    constructor(tag: ITag) {
        makeObservable<TagModel, PrivateTagFields>(this, {
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

export class TagsModel extends BaseModel {
    private _tags: TagModel[] = [];
    private _count: number = 0;
    private _criteria: ITagQueryOptions = {};
    private _page: number = 0;
    private _busy = false;
    private _loaded = false;
    private _pageSize = 50;

    constructor() {
        super();

        makeObservable<TagsModel, PrivateTagsFields>(this, {
            _busy: observable,
            _count: observable,
            _criteria: observable,
            _loaded: observable,
            _page: observable,
            _tags: observable,
            allTagsLoaded: computed,
            count: computed,
            isBusy: computed,
            isLoaded: computed,
            webServiceHelper: computed,
            getTags: action.bound,
            setCriteria: action.bound,
            tags: computed,
        });
    }

    get allTagsLoaded() {
        return this._tags.length === this._count;
    }

    get count() {
        return this._count;
    }

    get isBusy() {
        return this._busy;
    }

    get isLoaded() {
        return this._loaded;
    }

    get tags() {
        return this._tags;
    }

    public getTags = async (forcePaginationReset?: boolean) => {
        if (forcePaginationReset) {
            this._loaded = false;
            this._page = 0;
            this._tags = [];
        }

        this._busy = true;

        const result = await this.webServiceHelper.sendRequest<ITagsResponse>({
            path: `${this.composeUrl('/tags')}`,
            method: 'GET',
            queryParams: { ...this._criteria, page: this._page, pageSize: this._pageSize }
        });

        if (result.success) {
            runInAction(() => {
                this._busy = false;
                this._loaded = true;
                this._tags = [...this._tags, ...result.value.tags.map(t => new TagModel(t))];
                this._count = result.value.count;
                if (!this.allTagsLoaded) {
                    this._page += 1;
                }
            }); 
        } else {
            runInAction(() => {
                this._busy = false;
            });

            throw new Error(result.error);
        }
    }

    public setCriteria = (opts: ITagQueryOptions) => {
        this._page = 0;
        this._loaded = false;
        this._tags = [];
        this._count = 0;
        this._criteria = { ...opts };

        return this.getTags();
    }
}
