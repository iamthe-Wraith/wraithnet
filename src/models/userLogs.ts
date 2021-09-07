import { action, computed, makeObservable, observable, runInAction } from "mobx";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import equals from 'fast-deep-equal';
import timezone from 'dayjs/plugin/timezone';
import { BaseModel } from "./base";
import { ITag, TagModel } from "./tags";
import { UserLogEntry } from "../components/UserLogEntry";

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
    '_loaded' |
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
    private _entriesSet = new Set();
    private _count = 0;
    private _criteria: IEntryQueryOptions = {};
    private _page = 0;
    private _busy = false;
    private _loaded = false;

    constructor () {
        super();

        makeObservable<UserLogsModel, PrivateFields>(this, {
            _busy: observable,
            _count: observable,
            _criteria: observable,
            _entries: observable,
            _loaded: observable,
            _page: observable,
            allEntriesLoaded: computed,
            count: computed,
            entries: computed,
            isBusy: computed,
            isLoaded: computed,
            webServiceHelper: computed,
            getEntries: action.bound,
            setCriteria: action.bound,
        });
    }

    get allEntriesLoaded() {
        return this._entries.length === this._count;
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

    get isLoaded() {
        return this._loaded;
    }

    public setCriteria =  async (opts: IEntryQueryOptions, forceCriteriaReset?: boolean) => {
        const origCriteria = { ...this._criteria };
        this._page = 0;
        this._entries = [];
        this._entriesSet = new Set();
        this._count = 0;
        this._criteria = forceCriteriaReset ? { ...opts } : { ...this._criteria, ...opts };
        this._loaded = false;

        // only call getEntries if criteria has changed
        if (!equals(origCriteria, this._criteria)) {

            return this.getEntries(true);
        }
    }

    public getEntries = async (forcePaginationReset?: boolean) => {
        if (!this._busy) {
            this._busy = true;

            if (forcePaginationReset) {
                this._page = 0;
                this._entries = [];
                this._count = 0;
                this._loaded = false;
            }
    
            const result = await this.webServiceHelper.sendRequest<IUserLogResponse>({
                path: `${this.composeUrl('/user-log')}${this.constructQuery()}`,
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._busy = false;
                    this._loaded = true;
                    const newEntries = this.setEntriesToAdd(result.value.entries);
                    this._entries = [...this._entries, ...newEntries];
                    this._count = result.value.count;
                    if (!this.allEntriesLoaded) {
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
    }

    private setEntriesToAdd = (newEntries: IUserLogEntry[]) => {
        const entriesToAdd: UserLogEntryModel[] = [];

        newEntries.forEach(e => {
            if (!this._entriesSet.has(e.id)) {
                this._entriesSet.add(e.id);
                entriesToAdd.push(new UserLogEntryModel(e));
            }
        });

        return entriesToAdd;
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