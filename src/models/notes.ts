import dayjs from 'dayjs';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ThemeStore } from '../contexts/Theme';
import { BaseModel } from './base';
import { CollectionModel } from './collection';

type NotePrivateFields = '_busy' |
    '_loaded' |
    '_note' |
    '_setNote';

export interface INoteRef {
    id: string;
    access: string[];
    owner: string;
    createdAt: string;
    name: string;
    category: string;
    slug: string;
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
    
    constructor(note?: Partial<INoteRef>) {
        super();
        makeObservable<NoteModel, NotePrivateFields>(this, {
            _busy: observable,
            _loaded: observable,
            _note: observable,
            busy: computed,
            category: computed,
            createdAt: computed,
            loaded: computed,
            access: computed,
            name: computed,
            slug: computed,
            text: computed,
            _setNote: action.bound,
            load: action.bound,
            save: action.bound,
        });
        this._setNote(note);
    }

    get busy() { return this._busy }
    get id() { return this._note?.id }
    get access() { return this._note?.access ?? [] }
    get category() { return this._note?.category ?? '' }
    get createdAt() { return dayjs(this._note?.createdAt) }
    get loaded() { return this._loaded }
    get name() { return this._note?.name ?? '' }
    get slug() { return this._note?.slug ?? '' }
    get text() { return (this._note as INote)?.text || '' }

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
                this._note = result.value;
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

        const result = await this.webServiceHelper.sendRequest<INote>({
            path: this.composeUrl(`/notes${!!this.id ? `/${this.id}` : ''}`),
            method: !!this.id ? 'PATCH' : 'POST',
            data,
        });

        if (result.success) {
            runInAction(() => {
                this._note = result.value;
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
    }
}
