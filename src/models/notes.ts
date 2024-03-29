import dayjs from 'dayjs';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from './base';
import { CollectionModel } from './collection';
import { ITag, TagModel } from './tags';

type NotePrivateFields = '_busy' |
'_collectionRef' |
'_loaded' |
'_note' |
'_setNote' |
'_tags';

export interface INoteRef {
  id: string;
  access: string[];
  owner: string;
  createdAt: string;
  name: string;
  category: string;
  slug: string;
  tags?: ITag[];
}

export interface INote extends INoteRef {
  text: string;
}

export interface INotesResponse {
  count: number;
  notes: INoteRef[];
}

export class NoteModel extends BaseModel {
  private _busy = false;
  private _loaded = false;
  private _note: Partial<INoteRef | INote> = null;
  private _collectionRef: CollectionModel<INoteRef, NoteModel> = null;
  private _tags: TagModel[] = [];
    
  constructor(note?: Partial<INoteRef>, collection?: CollectionModel<INoteRef, NoteModel>) {
    super();
    makeObservable<NoteModel, NotePrivateFields>(this, {
      _busy: observable,
      _collectionRef: observable,
      _loaded: observable,
      _note: observable,
      _tags: observable,
      busy: computed,
      category: computed,
      createdAt: computed,
      loaded: computed,
      access: computed,
      name: computed,
      slug: computed,
      tags: computed,
      text: computed,
      _setNote: action.bound,
      load: action.bound,
      save: action.bound,
    });
    this._collectionRef = collection;
    this._setNote(note);
  }

  get busy() { return this._busy; }
  get id() { return this._note?.id; }
  get access() { return this._note?.access ?? []; }
  get category() { return this._note?.category ?? ''; }
  get createdAt() { return dayjs(this._note?.createdAt); }
  get loaded() { return this._loaded; }
  get name() { return this._note?.name ?? ''; }
  get slug() { return this._note?.slug ?? ''; }
  get tags() { return this._tags; }
  get text() { return (this._note as INote)?.text || ''; }

  public delete = async () => {
    if (this._busy) return;

    this._busy = true;

    const result = await this.webServiceHelper.sendRequest({
      path: this.composeUrl(`/notes/${this.id}`),
      method: 'DELETE',
    });

    if (result.success) {
      runInAction(() => {
        this._collectionRef?.remove(this._note.id);
        this._busy = false;
      });
    } else {
      runInAction(() => {
        this._busy = false;
      });

      throw new Error(result.error);
    }
  }

  public load = async () => {
    if (this._busy || this._loaded) return;

    if (!this.id && !this.category && !this.slug) throw new Error('unable to load note. no identifier found');

    this._busy = true;

    const url = !!this.id
      ? `/notes/${this.id}`
      : !!this.category && !!this.slug
        ? `/notes/s/${this.category}/${this.slug}`
        : null;

    if (!url) throw new Error('unable to load note. a url could not be constructed');

    const result = await this.webServiceHelper.sendRequest<INote>({
      path: this.composeUrl(url),
      method: 'GET',
    });

    if (result.success) {
      runInAction(() => {
        this._setNote(result.value);
        this._busy = false;
        this._loaded = true;
      });
    } else {
      runInAction(() => {
        this._busy = false;
      });

      throw new Error(result.error);
    }
  }

  public save = async (data: Partial<INoteRef | INote>) => {
    if (this._busy) return;

    this._busy = true;

    const parsedData = {
      ...data,
      tags: (data.tags || []).map(tag => tag.id),
    };

    const result = await this.webServiceHelper.sendRequest<INote>({
      path: this.composeUrl(`/notes${!!this.id ? `/${this.id}` : ''}`),
      method: !!this.id ? 'PATCH' : 'POST',
      data: parsedData,
    });

    if (result.success) {
      runInAction(() => {
        this._setNote(result.value);
        this._busy = false;
      });
    } else {
      runInAction(() => {
        this._busy = false;
      });

      throw new Error(result.error);
    }
  }

  private _setNote = (note: Partial<INoteRef>) => {
    this._note = note;
    this._tags = note.tags?.map(tag => new TagModel(tag));
  }
}
