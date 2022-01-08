import { observer } from 'mobx-react';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { withTheme } from 'styled-components';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { ToasterContext } from '../../contexts/Toaster';
import { CollectionModel } from '../../models/collection';
import { INoteRef, NoteModel } from '../../models/notes';
import { TagModel } from '../../models/tags';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';
import { NoteEditor } from '../NoteEditor';
import { TagsList } from '../TagsList';
import { TextInput } from '../TextInput';
import { ListItem } from './ListItem';

import { NoteEditorContainer, ListContainer, CollectionNoteEditorContainer, NewNoteModal, FilterContainer, SearchContainer, ConfirmDeleteContent } from './styles';

interface IProps extends IThemeProps {
    busy?: boolean;
    className?: string;
    collection?: CollectionModel<INoteRef, NoteModel>;
    onCreateNewClick?(name: string): Promise<NoteModel>;
    type: string;
}

interface INotesSearchParams {
    tags?: string[];
    name?: string;
}

const CollectionNoteEditorBase: React.FC<IProps> = ({
    busy,
    className = '',
    collection,
    onCreateNewClick,
    type,
    theme,
}) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const toaster = useContext(ToasterContext);
    const [selectedNote, setSelectedNote] = useState<NoteModel>(null);
    const [showNewNoteModal, setShowNewNoteModal] = useState(false);
    const [newNoteName, setNewNoteName] = useState('');
    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<number>(null);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
    const [noteToBeDeleted, setNoteToBeDeleted] = useState<NoteModel>(null);
    const searchEngaged = useRef(false);
    const tagsEngaged = useRef(false);
    const lowerType = useRef(type.toLowerCase()).current;

    const getQueryParams = () => {
        const queryParams: INotesSearchParams = {};
        if (search) queryParams.name = search;
        if (selectedTags.length) queryParams.tags = selectedTags.map(t => t.id);  
        return queryParams;
    };

    const loadMore = () => {
        collection.loadMore(getQueryParams())
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (!collection.firstPageLoaded) loadMore();

        return () => {
            setSearch('');
            setSelectedTags([]);
            collection.reset();
        };
    }, []);

    useEffect(() => {
        if (!showNewNoteModal) setNewNoteName('');
    }, [showNewNoteModal]);

    useEffect(() => {
        if (searchEngaged.current || tagsEngaged.current) {
            window.clearTimeout(searchTimeout);
            setSearchTimeout(window.setTimeout(() => {         
                collection.refresh(getQueryParams())
                    .catch(err => {
                        console.error(err);
                    });
            }, 300));
        }
    }, [search, selectedTags]);

    const onCancelNoteChange = (origNote: NoteModel, _: NoteModel) => {
        setSelectedNote(origNote);
    };

    const _onCreateNewClick = () => {
        onCreateNewClick?.(newNoteName)
            .then((n: NoteModel) => {
                // automatically select newly created 
                setShowNewNoteModal(false);
                setSelectedNote(n);
                setNewNoteName('');
            })
            .catch(err => {
                console.log(`error creating ${type}`);
                console.error(err);
            });
    };

    const onCancelDeletion = () => {
        setNoteToBeDeleted(null);
    };

    const onDeleteClick = (note: NoteModel) => () => {
        setNoteToBeDeleted(note);
    };

    const onDeleteConfirm = async () => {
        try {
            await noteToBeDeleted.delete();
            toaster.push({ message: 'Note deleted successfully' });
            setNoteToBeDeleted(null);
        } catch (err: any) {
            errorMessages.push({ message: err.message });
        }
    };

    const onNoteClick = (note: NoteModel) => () => {
        note.load()
            .catch(err => {
                console.log(`error loading ${type}`);
                console.error(err);
            });

        setSelectedNote(note);
    };

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        searchEngaged.current = true;
        setSearch(e.target.value);
    };

    const onSelectedTagsChange = (selectedTags: TagModel[]) => {
        tagsEngaged.current = true;
        setSelectedTags(selectedTags);
    };

    const renderEditor = () => {
        return (
            <NoteEditorContainer>
                <div>
                    <Button
                        buttonType={ ButtonType.Blank }
                        className='back-button'
                        onClick={ () => setSelectedNote(null) }
                    >
                        back
                    </Button>
                </div>
                {
                    selectedNote?.busy && (
                        <LoadingSpinner
                            type={ SpinnerType.Random }
                            size={ SpinnerSize.Large }
                        />
                    )
                }
                {
                    !!selectedNote && (
                        <NoteEditor
                            className={ `editor ${lowerType}-editor` }
                            note={ selectedNote }
                            onCancelNoteChange={ onCancelNoteChange }
                        />
                    ) 
                }
            </NoteEditorContainer>
        );
    };

    const renderList = () => {
        let list: JSX.Element[] = [];

        if (collection.results.length > 0) {
            const items = collection.results.map(note => (
                <ListItem
                    key={ note.id }
                    className='list-item'
                    onClick={ onNoteClick(note) }
                    onDelete={ onDeleteClick(note) }
                    selected={ selectedNote?.id === note.id }
                    note={ note }
                />
            ));
    
            list = [...list, ...items];
        } else {
            list.push(<div key='no-notes' className='no-notes'>no notes</div>);
        }

        if (collection.busy) {
            list.push((
                <div key='spinner' className='spinner-container'>
                    <LoadingSpinner
                        className='spinner'
                        type={ SpinnerType.Random }
                        size={ SpinnerSize.Medium }
                    />
                </div>
            ));
        }

        if (!collection.allResultsFetched && !collection.busy) {
            return [...list, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
        }

        return list;
    };

    const renderSearch = () => {
        return (
            <>
                <FilterContainer>
                    <SearchContainer>
                        <TextInput
                            inputId={ `${lowerType}-search-input` }
                            onChange={ onSearchChange }
                            placeholder={ `Search ${type}${lowerType === 'misc' ? '' : 's'}`  }
                            value={ search }
                        />
                        <div className='clear-search-container'>
                            {
                                !!search && (
                                    <Button
                                        buttonType={ ButtonType.Blank }
                                        onClick={ () => setSearch('') }
                                    >
                                        clear search
                                    </Button>
                                )
                            }
                        </div>
                        <Right2 />
                    </SearchContainer>
                    <TagsList
                        className='tags-list'
                        defaultSelectedTags={ selectedTags }
                        onSelectedTagsChange={ onSelectedTagsChange }
                    />
                </FilterContainer>
                <ListContainer>
                    <div className='header'>{ `${type}${lowerType === 'misc' ? '' : 's'}` }</div>
                    <div className='list'>
                        { renderList() }
                    </div>
                    <div className='footer'>
                        <Button
                            buttonType={ ButtonType.Blank }
                            onClick={ () => setShowNewNoteModal(true) }
                        >
                            { `+ add ${lowerType}` }
                        </Button>
                    </div>
                </ListContainer>
            </>
        );
    };

    return (
        <CollectionNoteEditorContainer className={ className }>
            {
                selectedNote
                    ? renderEditor()
                    : renderSearch()
            }
            <Modal
                header={ `New ${type}` }
                onClose={ () => setShowNewNoteModal(false) }
                isOpen={ showNewNoteModal }
                size={ ModalSize.Small }
            >
                <NewNoteModal>
                    <div className='label'>{ `${lowerType} name` }</div>
                    <TextInput
                        inputId={ `new-${lowerType}-name-input` }
                        onChange={ e => setNewNoteName(e.target.value) }
                        value={ newNoteName }
                    />
                    <CTAs
                        ctas={ [
                            {
                                disabled: !newNoteName,
                                text: 'create',
                                type: ButtonType.Primary,
                                onClick: _onCreateNewClick,
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.Blank,
                                onClick: () => setShowNewNoteModal(false),
                            },
                        ] }
                    />
                    { busy && <LoadingSpinner size={ SpinnerSize.Tiny } />}
                </NewNoteModal>
            </Modal>
            <Modal
                borderColor={ theme.error }
                header='Confim Note Deletion'
                isOpen={ !!noteToBeDeleted }
                onClose={ () => setNoteToBeDeleted(null) }
                size={ ModalSize.Medium }
            >
                <ConfirmDeleteContent>
                    <div>Are you sure you want to delete note:</div>
                    <div className='note-name'>{ noteToBeDeleted?.name }</div>
                </ConfirmDeleteContent>
                <CTAs
                    ctas={ [
                        {
                            text: 'Delete',
                            type: ButtonType.Error,
                            onClick: onDeleteConfirm,
                        },
                        {
                            text: 'Cancel',
                            type: ButtonType.Blank,
                            onClick: onCancelDeletion,
                        },
                    ] }
                />
            </Modal>
        </CollectionNoteEditorContainer>
    );
};

const CollectionNoteEditorAsObserver = observer(CollectionNoteEditorBase);
export const CollectionNoteEditor = withTheme(CollectionNoteEditorAsObserver);
