import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "./base";

type PrivateFields = '_addItems' |
'_busy' |
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

type SortOrder = 'asc' | 'desc'

export class CollectionModel<T, U extends { id: string }> extends BaseModel {
  private _busy = false;
  private _firstPageLoaded = false;
  private _totalCount = 0;
  private _results: U[] = [];
  private _baseApiUrl = '';
  private _index: Set<string> = new Set();
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
      _addItems: action.bound,
      _init: action.bound,
      loadMore: action.bound,
      push: action.bound,
      refresh: action.bound,
      remove: action.bound,
      reset: action.bound,
      sort: action.bound,
      unshift: action.bound,
    });
    this._init(baseApiUrl, transformer);
  }

  get busy() { return this._busy; }
  get allResultsFetched() { return this._totalCount === this._results.length; }
  get firstPageLoaded() { return this._firstPageLoaded; }
  get totalCount() { return this._totalCount; }
  get results() { return this._results; }

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
        this._addItems(result.value.results.map(r => this._transformer(r)), 'push');
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
    this._addItems([item], 'push');
  }

  public refresh = async (queryParams: { [key: string]: any } = {}) => {
    this.reset();
    return this.loadMore(queryParams);
  }

  public remove = (id: string) => {
    this._results = this._results.filter(r => r.id! !== id);
  }

  public reset = () => {
    this._firstPageLoaded = false;
    this._totalCount = 0;
    this._index = new Set();
    this._results = [];
    this._page = 0;
    this._pageSize = 25;
  }

  public sort = (property: keyof U, order: SortOrder) => {
    const newArr = [...this._results];

    newArr.sort((x, y) => {
      if (x[property] < y[property]) {
        return order === 'asc' ? 1 : -1;
      } else if (x[property] > y[property]) {
        return order === 'asc' ? -1 : 1;
      } else {
        return 0;
      }
    });

    this._results = newArr;
  }

  public unshift = (item: U) => {
    this._addItems([item], 'unshift');
  }

  private _addItems = (items: U[], method: 'push' | 'unshift') => {
    const itemsToAdd: U[] = [];
    items.forEach(i => {
      // use Set to prevent duplicates
      if (!this._index.has((i as any).id)) {
        this._index.add((i as any).id);
        itemsToAdd.push(i);
      }
    });

    if (itemsToAdd.length) {
      if (method === 'push') {
        this._results = [...this._results, ...itemsToAdd];
      } else if (method === 'unshift') {
        this._results = [...itemsToAdd, ...this._results];
      }
    }
  }

  private _init = (baseApiUrl: string, transformer: (result: T) => U) => {
    this._baseApiUrl = baseApiUrl;
    this._transformer = transformer;
  }
}