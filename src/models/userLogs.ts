import { action, computed, makeObservable, observable, runInAction } from "mobx";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import equals from 'fast-deep-equal';
import timezone from 'dayjs/plugin/timezone';
import { BaseModel } from "./base";
import { ITag, TagModel } from "./tags";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IEntryQueryOptions {
    page?: number;
    text?: string;
    tags?: ITag[];
    noTags?: boolean;
    anyTags?: boolean;
    created?: string;
    createdBefore?: string;
    createdAfter?: string;
}

export interface IUserLogEntry {
    id: string;
    content: string;
    createdAt: string;
    owner: string;
    tags: ITag[];
}

export interface IUserLogResponse {
    count: number;
    entries: IUserLogEntry[];
}

type PrivateFields = '_busy' |
    '_count' |
    '_criteria' |
    '_entries' |
    '_page';

type EntryPrivateFields = '_entry' | '_tags';

export class UserLogEntryModel {
    private _entry: IUserLogEntry = null;
    private _tags: TagModel[] = null;
    constructor(entry: IUserLogEntry) {
        makeObservable<UserLogEntryModel, EntryPrivateFields>(this, {
            _entry: observable,
            _tags: observable,
            id: computed,
            content: computed,
            createdAt: computed,
        });

        this._tags = entry.tags
            .filter(t => !!t)
            .map(t => new TagModel(t));
        this._entry = entry;
    }

    get id() {
        return this._entry.id;
    }

    get content() {
        return this._entry.content;
    }

    get createdAt() {
        return dayjs(this._entry.createdAt).local().format();
    }

    get owner() {
        return this._entry.owner;
    }

    get tags() {
        return this._tags;
    }
}

export class UserLogsModel extends BaseModel {
    private _entries: UserLogEntryModel[] = [];
    private _count = 0;
    private _criteria: IEntryQueryOptions = {};
    private _page = 0;
    private _busy = false;

    constructor () {
        super();

        makeObservable<UserLogsModel, PrivateFields>(this, {
            _busy: observable,
            _count: observable,
            _criteria: observable,
            _entries: observable,
            _page: observable,
            count: computed,
            entries: computed,
            isBusy: computed,
            webServiceHelper: computed,
            getEntries: action.bound,
            setCriteria: action.bound,
        });
    }

    get count() {
        return this._count;
    }

    get criteria() {
        return this._criteria;
    }

    get entries() {
        return this._entries ?? [];
    }

    get isBusy() {
        return this._busy;
    }

    public setCriteria = async (opts: IEntryQueryOptions, forceCriteriaReset?: boolean) => {
        const origCriteria = { ...this._criteria };
        this._page = 0;
        this._entries = [];
        this._count = 0;
        this._criteria = forceCriteriaReset ? { ...opts } : { ...this._criteria, ...opts };

        // only call getEntries if criteria has changed
        if (!equals(origCriteria, this._criteria)) return this.getEntries();
    }

    public getEntries = async (forcePaginationReset?: boolean) => {
        this._busy = true;

        if (forcePaginationReset) {
            this._page = 0;
            this._entries = [];
        }

        const result = await this.webServiceHelper.sendRequest<IUserLogResponse>({
            path: `${this.composeUrl('/user-log')}${this.constructQuery()}`,
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._busy = false;
                this._entries = [...this._entries, ...result.value.entries.map(e => new UserLogEntryModel(e))];
                this._count = result.value.count;
            }); 
        } else {
            runInAction(() => {
                this._busy = false;
            });
            
            throw new Error(result.error);
        }
    }

    private constructQuery = () => {
        const query: string[] = [];

        Object.entries(this._criteria).forEach(([key, value]) => {
            if (value) {
                if (key === 'tags') {
                    if ((value || []).length) {
                        query.push(`${key}=${value.map((t: ITag) => t.id)}`)
                    }
                } else {
                    query.push(`${key}=${value}`);
                }
            }
        });

        query.push(`page=${this._page}`);

        return query.length > 0
            ? `?${query.join('&')}`
            : '';
    }
}