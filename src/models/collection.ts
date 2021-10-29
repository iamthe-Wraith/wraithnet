import { Method } from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "./base";

type PrivateFields = '_busy' |
    '_firstPageLoaded' |
    '_init' |
    '_page' |
    '_pageSize' |
    '_results' |
    '_totalCount';

interface ICollectionResponse<T> {
    count: number;
    results: T[];
}

export class CollectionModel<T, U> extends BaseModel {
    private _busy = false;
    private _firstPageLoaded = false;
    private _totalCount = 0;
    private _results: U[] = [];
    private _baseApiUrl = '';
    private _transformer: (result: T) => U = null;
    private _page = 0;
    private _pageSize = 25;

    constructor(baseApiUrl: string, transformer: (result: T) => U) {
        super();
        makeObservable<CollectionModel<T, U>, PrivateFields>(this, {
            _busy: observable,
            _firstPageLoaded: observable,
            _page: observable,
            _pageSize: observable,
            _results: observable,
            _totalCount: observable,
            firstPageLoaded: computed,
            results: computed,
            totalCount: computed,
            _init: action.bound,
            loadMore: action.bound,
            push: action.bound,
            refresh: action.bound,
            unshift: action.bound,
        });
        this._init(baseApiUrl, transformer);
    }

    get busy() { return this._busy }
    get allResultsFetched() { return this._totalCount === this._results.length }
    get firstPageLoaded() { return this._firstPageLoaded }
    get totalCount() { return this._totalCount }
    get results() { return this._results };

    public loadMore = async (queryParams: { [key: string]: any } = {}) => {
        if (this._busy || (this.allResultsFetched && this.firstPageLoaded)) return;

        this._busy = true;

        const result = await this.webServiceHelper.sendRequest<ICollectionResponse<T>>({
            path: this._baseApiUrl,
            method: 'GET',
            queryParams: { ...queryParams, page: this._page, pageSize: this._pageSize },
        });

        if (result.success) {
            runInAction(() => {
                this._totalCount = result.value.count;
                this._results = [...this._results, ...result.value.results.map(r => this._transformer(r))];
                this._firstPageLoaded = true;
                this._busy = false;
                if (!this.allResultsFetched) this._page += 1;
            });
        } else {
            runInAction(() => {
                this._busy = false;
            });

            throw new Error(result.error);
        }
    }

    public push = (item: U) => {
        this._results.push(item);
    }

    public refresh = async (queryParams: { [key: string]: any } = {}) => {
        this._firstPageLoaded = false;
        this._totalCount = 0
        this._results = [];
        this._page = 0;
        this._pageSize = 25;

        return this.loadMore(queryParams);
    }

    public unshift = (item: U) => {
        this._results.unshift(item);
    }

    private _init = (baseApiUrl: string, transformer: (result: T) => U) => {
        this._baseApiUrl = baseApiUrl;
        this._transformer = transformer;
    }
}