import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { CollectionModel } from '../../models/collection';
import { INoteRef, NoteModel } from '../../models/notes';
import { Button, ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';
import { NoteEditor } from '../NoteEditor';
import { TextInput } from '../TextInput';
import { ListItem } from './ListItem';

import { NoteEditorContainer, ListContainer, CollectionNoteEditorContainer, NewNoteModal } from './styles';

interface IProps {
    busy?: boolean;
    className?: string;
    collection?: CollectionModel<INoteRef, NoteModel>;
    onCreateNewClick?(name: string): Promise<NoteModel>;
    type: string;
}

const CollectionNoteEditorBase: React.FC<IProps> = ({ busy, className = '', collection, onCreateNewClick, type }) => {
    const [selectedNote, setSelectedNote] = useState<NoteModel>(null);
    const [showNewNoteModal, setShowNewNoteModal] = useState(false);
    const [newNoteName, setNewNoteName] = useState('');
    const lowerType = useRef(type.toLowerCase()).current;

    const loadMore = () => {
        collection.loadMore()
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (!collection.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (!showNewNoteModal) setNewNoteName('');
    }, [showNewNoteModal]);

    const onCancelNoteChange = (origNote: NoteModel, _: NoteModel) => {
        setSelectedNote(origNote);
    }

    const _onCreateNewClick = (name: string) => () => {
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
    }

    const onNoteClick = (note: NoteModel) => () => {
        note.load()
            .catch(err => {
                console.log(`error loading ${type}`);
                console.error(err);
            });

        setSelectedNote(note);
    }

    const renderList = () => {
        let list: JSX.Element[] = [];

        if (collection.results.length > 0) {
            const items = collection.results.map(note => (
                <ListItem
                    key={ note.id }
                    onClick={ onNoteClick(note) }
                    selected={ selectedNote?.id === note.id }
                    note={ note }
                />
            ));
    
            list = [...list, ...items];
        } else {
            list.push(<div key='no-notes' className='no-notes'>no notes</div>)
        }

        if (collection.busy) {
            list.push((
                <div key='spinner' className='spinner-container'>
                    <LoadingSpinner
                        className='spinner'
                        type={SpinnerType.Random}
                        size={ SpinnerSize.Tiny }
                    />
                </div>
            ));
        }

        if (!collection.allResultsFetched && !collection.busy) {
            return [...list, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
        }

        return list;
    }

    return (
        <CollectionNoteEditorContainer className={ className }>
            <ListContainer>
                <div className='header'>{ `${type}${lowerType === 'misc' ? '' : 's'}` }</div>
                <div className='list'>
                    { renderList() }
                </div>
                <div className='footer'>
                    <Button
                        buttonType={ ButtonType.Blank }
                        onClick={() => setShowNewNoteModal(true)}
                    >
                        { `+ add ${lowerType}` }
                    </Button>
                </div>
                <Right2 />
            </ListContainer>
            <NoteEditorContainer>
                {
                    selectedNote?.busy && (
                        <LoadingSpinner
                            type={SpinnerType.Random}
                            size={ SpinnerSize.Small }
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
            <Modal
                header={ `New ${type}` }
                onClose={() => setShowNewNoteModal(false)}
                isOpen={ showNewNoteModal }
                size={ ModalSize.Small }
            >
                <NewNoteModal>
                    <div className='label'>{ `${lowerType} name` }</div>
                    <TextInput
                        inputId={ `new-${lowerType}-name-input` }
                        onChange={e => setNewNoteName(e.target.value)}
                        value={ newNoteName }
                    />
                    <CTAs
                        ctas={[
                            {
                                disabled: !newNoteName,
                                text: 'create',
                                type: ButtonType.Primary,
                                onClick: _onCreateNewClick(newNoteName),
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.Blank,
                                onClick: () => setShowNewNoteModal(false),
                            }
                        ]}
                    />
                    { busy && <LoadingSpinner size={ SpinnerSize.Tiny } />}
                </NewNoteModal>
            </Modal>
        </CollectionNoteEditorContainer>
    );
};

export const CollectionNoteEditor = observer(CollectionNoteEditorBase);
