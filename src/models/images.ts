import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BaseModel } from './base';
import { CollectionModel } from './collection';

type ImagePrivateFields = '_busy' |
'_image';

type ImagesPrivateFields = '_busy' |
'_images' |
'_modalIsOpen';

export interface IImage {
  fileName: string;
  fileSize: number;
  id: string;
  mimetype: string;
  owner: string;
  url: string;
}

export class ImageModel {
  private _busy = false;
  private _image: IImage = null;

  constructor (image: IImage) {
    makeObservable<ImageModel, ImagePrivateFields>(this, {
      _busy: observable,
      _image: observable,
      busy: computed,
      fileName: computed,
      fileSize: computed,
      id: computed,
      url: computed,
    });

    this._image = image;
  }

  get busy() { return this._busy; }
  get fileName() { return this._image.fileName; }
  get fileSize() { return this._image.fileSize; }
  get id() { return this._image.id; }
  get mimetype() { return this._image.mimetype; }
  get url() { return this._image.url; }
}

export class ImagesModel extends BaseModel {
  private _busy = false;
  private _images: CollectionModel<IImage, ImageModel> = null;
  private _modalIsOpen = false;

  constructor () {
    super();
    makeObservable<ImagesModel, ImagesPrivateFields>(this, {
      _busy: observable,
      _images: observable,
      _modalIsOpen: observable,
      busy: computed,
      images: computed,
      modalIsOpen: computed,
      hideModal: action.bound,
      showModal: action.bound,
      upload: action.bound,
    });

    this._images = new CollectionModel<IImage, ImageModel>(
      this.composeUrl('/image'),
      (image: IImage) => new ImageModel(image),
    );
  }

  get busy() { return this._busy; }
  get images() { return this._images; }
  get modalIsOpen() { return this._modalIsOpen; }

  public hideModal = () => {
    this._modalIsOpen = false;
  }

  public showModal = () => {
    this._modalIsOpen = true;
  }

  public upload = async (files: FileList) => {
    if (!this.busy) {
      this._busy = true;

      const formData = new FormData();
      formData.append('file', files[0]);

      const result = await this.webServiceHelper.sendFormDataRequest<IImage>(this.composeUrl('/upload/image'), 'POST', formData);

      if (result.success) {
        runInAction(() => {
          this._images.push(new ImageModel(result.value));
          this._busy = false;
        });
      } else {
        runInAction(() => {
          this._busy = false;
        });

        throw new Error(result.error);
      }
    }
  }
}
