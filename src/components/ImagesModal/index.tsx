import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { roundFileSize } from '../../lib/files';
import { ImageModel, ImagesModel } from '../../models/images';
import { ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { ModalSize } from '../Modal';
import { FileContent, ImageContainer, ImagesContainer, ImagesModalContainer, ImageUploadConfirmationModal } from './styles';

const supportedImageTypes = '.jpeg,.jpg,.png,.svg';

interface IProps {
  className?: string;
  header?: string | JSX.Element;
  isOpen: boolean;
  onClose(): void;
}

const ImagesModalBase: React.FC<IProps> = ({
  className = '',
  isOpen,
  onClose,
}) => {
  const imagesModel = useRef(new ImagesModel()).current;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList>(null);

  const copyUrl = (img: ImageModel) => () => {
    navigator.clipboard.writeText(img.url);
  };

  const loadMore = () => {
    if (!imagesModel.images.firstPageLoaded) {
      imagesModel.images.loadMore()
        .catch(err => {
          console.log('>>>>> error loading images');
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const onCancelUpload = () => setFiles(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(e.target.files);
  };

  const onConfirmUploadClick = () => {
    if (!!files) {
      imagesModel.upload(files)
        .then(() => {
          console.log('>>>>> success');
          setFiles(null);
        })
        .catch(err => {
          console.log('>>>>> error');
          console.log(err);
        });
    }
  };

  const onUploadClick = () => inputRef.current?.click();

  const renderConfirmationContent = () => {
    if (!files) return <p>No images to upload found.</p>;

    const content: JSX.Element[] = [];
    for(let i = 0; i < files.length; i++) {
      content.push((
        <FileContent key={ `image-${i}` }>
          <span>{ files[i].name }</span>
          <span>{ roundFileSize(files[i].size) }</span>
        </FileContent>
      ));
    }
    return content;
  };

  const renderImages = () => {
    if (!imagesModel.images.firstPageLoaded) return null;

    return imagesModel.images.results.map(img => (
      <ImageContainer key={ img.id } onClick={ copyUrl(img) }>
        <div>
          <img src={ img.url } />
        </div>
        <div>
          { img.fileName }
        </div>
      </ImageContainer>
    ));
  };

  return (
    <ImagesModalContainer
      className={ className }
      header='Images'
      isOpen={ isOpen }
      onClose={ onClose }
      size={ ModalSize.Large }
    >
      <input
        accept={ supportedImageTypes }
        name='image'
        onChange={ onInputChange }
        ref={ inputRef }
        type='file'
      />
      <ImagesContainer>
        { renderImages() }
      </ImagesContainer>
      <CTAs
        ctas={ [
          {
            disabled: false,
            text: 'Upload',
            type: ButtonType.Primary,
            onClick: onUploadClick,
          },
        ] }
      />
      <ImageUploadConfirmationModal
        header={ !!files ? 'Confirm Upload' : '' }
        isOpen={ !!files }
        onClose={ onCancelUpload }
      >
        <div className={ `align-${!!files ? 'left' : 'center'}` }>
          { renderConfirmationContent() }
        </div>
        <CTAs
          ctas={ [
            {
              disabled: !files,
              text: 'Confirm Upload',
              type: ButtonType.Primary,
              onClick: onConfirmUploadClick,
            },
            {
              disabled: false,
              text: 'Cancel',
              type: ButtonType.BlankReverse,
              onClick: onCancelUpload,
            },
          ] }
        />
        { imagesModel.busy && <LoadingSpinner size={ SpinnerSize.Small } /> }
      </ImageUploadConfirmationModal>
    </ImagesModalContainer>
  );
};

export const ImagesModal = observer(ImagesModalBase);
