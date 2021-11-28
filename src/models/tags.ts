import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseModel } from "./base";
import { CollectionModel } from "./collection";

dayjs.extend(timezone);

export interface ITag {
  createdAt: string;
  id: string;
  owner: string;
  text: string;
}

type PrivateTagFields = '_tag';
type PrivateTagsFields = '_busy' |
'_tags' |
'_creatingTag';

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
  private _tags: CollectionModel<ITag, TagModel> = null;
  private _busy = false;
  private _creatingTag = false;

  constructor() {
    super();
    makeObservable<TagsModel, PrivateTagsFields>(this, {
      _busy: observable,
      _creatingTag: observable,
      _tags: observable,
      creatingTag: computed,
      createTag: action.bound,
    });
    this._tags = new CollectionModel<ITag, TagModel>(
      this.composeUrl(`/tags`),
      (tag: ITag) => new TagModel(tag),
    );
  }

  get busy() { return this._busy; }
  get creatingTag() { return this._creatingTag; }
  get tags() { return this._tags; }

  public createTag = async (text: string) => {
    if (!this._creatingTag) {
      this._creatingTag = true;

      const result = await this.webServiceHelper.sendRequest<ITag>({
        path: this.composeUrl('/tags'),
        method: 'POST',
        data: { text },
      });

      if (result.success) {
        const newTag = new TagModel(result.value);
        runInAction(() => {
          this._creatingTag = false;
          this._tags.push(newTag);
        });
        return newTag;
      } else {
        runInAction(() => {
          this._creatingTag = false;
        });

        throw new Error(result.error);
      }
    }
  }
}
