import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
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
type PrivateTagsFields = '_count' | '_criteria' | '_page' | '_tags';

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

    constructor() {
        super();

        makeObservable<TagsModel, PrivateTagsFields>(this, {
            _count: observable,
            _criteria: observable,
            _page: observable,
            _tags: observable,
            count: computed,
            webServiceHelper: computed,
            getTags: action.bound,
            setCriteria: action.bound,
            tags: computed,
        });
    }

    get count() {
        return this._count;
    }

    get tags() {
        return this._tags;
    }

    private constructQuery = () => {
        const query: string[] = [];

        Object.entries(this._criteria).forEach(([key, value]) => {
            if (value) {
                query.push(`${key}=${value}`);
            }
        });

        query.push(`page=${this._page}`);

        return query.length > 0
            ? `?${query.join('&')}`
            : '';
    }

    public getTags = async (forcePaginationReset?: boolean) => {
        if (forcePaginationReset) {
            this._page = 0;
            this._tags = [];
        }

        const result = await this.webServiceHelper.sendRequest<ITagsResponse>({
            path: `${this.composeUrl('/tags')}${this.constructQuery()}`,
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._tags = [...this._tags, ...result.value.tags.map(t => new TagModel(t))];
                this._count = result.value.count;
            }); 
        } else {
            throw new Error(result.error);
        }
    }

    public setCriteria = (opts: ITagQueryOptions) => {
        this._page = 0;
        this._tags = [];
        this._count = 0;
        this._criteria = { ...opts };

        return this.getTags();
    }
}
