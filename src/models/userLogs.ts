import { action, computed, makeObservable, observable, runInAction } from "mobx";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";
import { BaseModel } from "./base";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IEntryQueryOptions {
    page?: number;
    text?: string;
    tags?: string[];
    created?: string;
    createdBefore?: string;
    createdAfter?: string;
}

export interface IUserLogEntry {
    _id: string;
    content: string;
    createdAt: string;
    owner: string;
    tags: string[];
}

export interface IUserLogResponse {
    count: number;
    entries: IUserLogEntry[];
}

type PrivateFields = '_count' |
    '_criteria' |
    '_entries' |
    '_page' |
    '_webServiceHelper';

type EntryPrivateFields = '_entry';

export class UserLogEntryModel {
    private _entry: IUserLogEntry = null;
    constructor(entry: IUserLogEntry) {
        makeObservable<UserLogEntryModel, EntryPrivateFields>(this, {
            _entry: observable,
            id: computed,
            content: computed,
            createdAt: computed,
        });

        this._entry = entry;
    }

    get id() {
        return this._entry._id;
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
        return this._entry.tags || [];
    }
}

export class UserLogsModel extends BaseModel {
    private _entries: UserLogEntryModel[] = [];
    private _count: number = 0;
    private _criteria: IEntryQueryOptions = {};
    private _page: number = 0;
    private _webServiceHelper: WraithnetApiWebServiceHelper = null;

    constructor () {
        super();

        makeObservable<UserLogsModel, PrivateFields>(this, {
            _count: observable,
            _criteria: observable,
            _entries: observable,
            _page: observable,
            _webServiceHelper: observable,
            count: computed,
            entries: computed,
            webServiceHelper: computed,
            getEntries: action.bound,
            setCriteria: action.bound,
        });
    }

    get count() {
        return this._count;
    }

    get entries() {
        return this._entries ?? [];
    }

    get webServiceHelper() {
        if (!this._webServiceHelper) {
          // only want to instantiate object when used...
          this._webServiceHelper = new WraithnetApiWebServiceHelper();
        }
    
        return this._webServiceHelper;
    }

    public setCriteria = (opts: IEntryQueryOptions) => {
        this._page = 0;
        this._entries = [];
        this._count = 0;
        this._criteria = { ...opts };

        return this.getEntries();
    }

    public getEntries = async (forcePaginationReset?: boolean) => {
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
                this._entries = [...this._entries, ...result.value.entries.map(e => new UserLogEntryModel(e))];
                this._count = result.value.count;
            }); 
        } else {
            console.log('error getting user log entries: ', result.value);
        }
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
}