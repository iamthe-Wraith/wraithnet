import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { ToasterContext } from '../../contexts/Toaster';
import { roundFileSize } from '../../lib/files';
import { ImageModel, ImagesModel } from '../../models/images';
import { ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { CTAs } from '../CtasContainer';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { TextInput } from '../TextInput';
import { FileContent, FileExtOptions, FilterContainer, ImageContainer, ImagesContainer, ImagesModalContainer, ImageUploadConfirmationModal, InnerContainer, LoadingSpinnerContainer, MainImagesContainer } from './styles';

type FileTypes = 'png' | 'jpg' | 'jpeg' | 'svg' | 'pdf';
const supportedImageTypes = '.jpeg,.jpg,.png,.svg,.pdf';

interface IProps {
    className?: string;
    header?: string | JSX.Element;
    isOpen: boolean;
    onClose(): void;
}

interface IQueryParams {
    fileName?: string;
    fileTypes?: FileTypes[];
}

interface IFileTypeOption {
    context: FileTypes,
    text: string;
    selected: boolean;
}

const defaultFileTypeOptions: IFileTypeOption[] = [
    {
        context: 'png',
        text: '.png',
        selected: true,
    },
    {
        context: 'jpg',
        text: '.jpg',
        selected: true,
    },
    {
        context: 'jpeg',
        text: '.jpeg',
        selected: true,
    },
    {
        context: 'svg',
        text: '.svg',
        selected: true,
    },
    {
        context: 'pdf',
        text: '.pdf',
        selected: true,
    },
];

const ImagesModalBase: React.FC<IProps> = ({
    className = '',
    isOpen,
    onClose,
}) => {
    const toaster = useContext(ToasterContext);
    const errorMessages = useContext(ErrorMessagesContext);
    const imagesModel = useRef(new ImagesModel()).current;
    const inputRef = useRef<HTMLInputElement>(null);
    const searchEngaged = useRef(false);
    const fileTypesEngaged = useRef(false);
    const [files, setFiles] = useState<FileList>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<number>(null);
    const [fileTypeOptions, setFileTypeOptions] = useState(defaultFileTypeOptions);

    const copyUrl = (img: ImageModel) => () => {
        navigator.clipboard.writeText(img.url);
        toaster.push({ message: 'URL copied to clipboard' });
    };

    const getQueryParameters = () => {
        const params: IQueryParams = {
            fileTypes: fileTypeOptions.filter(option => option.selected).map(option => option.context),
        };

        if (!!searchQuery) params.fileName = searchQuery;

        return params;
    };

    const loadMore = () => {
        imagesModel.images.loadMore(getQueryParameters())
            .catch(err => {
                errorMessages.push({ message: err.message });
            });
    };

    useEffect(() => {
        if (!imagesModel.images.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (searchEngaged.current || fileTypesEngaged.current) {
            window.clearTimeout(searchTimeout);
            setSearchTimeout(window.setTimeout(() => { 
                imagesModel.images.refresh(getQueryParameters())        
                    .catch(err => {
                        errorMessages.push({ message: err.message });
                    });
            }, 300));
        }
    }, [searchQuery, fileTypeOptions]);

    const onCancelUpload = () => setFiles(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFiles(e.target.files);
    };

    const onConfirmUploadClick = () => {
        if (!!files) {
            imagesModel.upload(files)
                .then(() => {
                    toaster.push({ message: 'Image uploaded successfully'});
                    setFiles(null);
                })
                .catch(err => {
                    errorMessages.push({ message: err.message });
                });
        }
    };

    const onFileTypeOptionChange = useCallback((option: IFileTypeOption) => () => {
        fileTypesEngaged.current = true;

        const updatedOptions = fileTypeOptions.map(opt => {
            if (option.context !== opt.context) return opt;

            return {
                ...opt,
                selected: !opt.selected,
            };
        });

        setFileTypeOptions(updatedOptions);
    }, [fileTypeOptions]);

    const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        searchEngaged.current = true;
        setSearchQuery(e.target.value);
    }, [searchQuery]);

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

    const renderFileExtOptions = useCallback(() => fileTypeOptions.map(option => (
        <Checkbox
            key={ option.context }
            className='file-type-option'
            id={ option.context }
            label={ <div>{ option.text }</div> }
            onChange={ onFileTypeOptionChange(option) }
            checked={ option.selected }
        />
    )), [fileTypeOptions]);

    const renderImages = () => {
        if (!imagesModel.images.firstPageLoaded) return null;

        let images: JSX.Element[] = [];

        if (imagesModel.images.results.length > 0) {
            images = imagesModel.images.results.map(img => (
                <ImageContainer key={ img.id } onClick={ copyUrl(img) }>
                    <div>
                        <img src={ img.url } />
                    </div>
                    <div>
                        { img.fileName }
                    </div>
                </ImageContainer>
            ));
        } else if (!imagesModel.images.busy && imagesModel.images.firstPageLoaded) {
            images.push((
                <div>
                    No images found
                </div>
            ));
        }

        if (imagesModel.images.busy) {
            images.push((
                <LoadingSpinnerContainer>
                    <LoadingSpinner size={ SpinnerSize.Medium } />
                </LoadingSpinnerContainer>
            ));
        }

        if (!imagesModel.images.busy && !imagesModel.images.allResultsFetched) {
            images.push(<Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />);
        }

        return images;
    };

    return (
        <ImagesModalContainer
            closeOnOverlayClick
            className={ className }
            header='Images'
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <InnerContainer>
                <input
                    accept={ supportedImageTypes }
                    name='image'
                    onChange={ onInputChange }
                    ref={ inputRef }
                    type='file'
                />
                <MainImagesContainer>
                    <FilterContainer>
                        <TextInput
                            inputId='images-search'
                            placeholder='search images'
                            onChange={ onSearchChange }
                            value={ searchQuery }
                        />
                        <FileExtOptions>
                            <h4>File Types</h4>
                            { renderFileExtOptions() }
                        </FileExtOptions>
                    </FilterContainer>
                    <ImagesContainer>
                        { renderImages() }
                    </ImagesContainer>
                </MainImagesContainer>
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
            </InnerContainer>
        </ImagesModalContainer>
    );
};

export const ImagesModal = observer(ImagesModalBase);
