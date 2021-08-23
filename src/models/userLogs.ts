import { action, computed, makeObservable, observable, runInAction } from "mobx";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";
import { BaseModel } from "./base";

dayjs.extend(utc)

export interface IUserLog {
    id: string;
}

export interface IEntryQueryOptions {
    page?: number;
    text?: string;
    tags?: string[];
    created?: dayjs.Dayjs;
    createdBefore?: dayjs.Dayjs;
    createdAfter?: dayjs.Dayjs;
}

type PrivateFields = '_count' |
    '_criteria' |
    '_entries' |
    '_page' |
    '_webServiceHelper';

export class UserLogsModel extends BaseModel {
    private _entries: IUserLog[] = [];
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
        if (opts.created) opts.created = dayjs(opts.created);

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

        const result = await this.webServiceHelper.sendRequest({
            path: `${this.composeUrl('/user-log')}${this.constructQuery()}`,
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._entries = [...this._entries, ...result.value.entries];
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