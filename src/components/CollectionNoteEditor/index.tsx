import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { CollectionModel } from '../../models/collection';
import { INoteRef, NoteModel } from '../../models/notes';
import { TagModel } from '../../models/tags';
import { Button, ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';
import { NoteEditor } from '../NoteEditor';
import { TagsList } from '../TagsList';
import { TextInput } from '../TextInput';
import { ListItem } from './ListItem';

import { NoteEditorContainer, ListContainer, CollectionNoteEditorContainer, NewNoteModal, FilterContainer, SearchContainer } from './styles';

interface IProps {
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

const CollectionNoteEditorBase: React.FC<IProps> = ({ busy, className = '', collection, onCreateNewClick, type }) => {
  const [selectedNote, setSelectedNote] = useState<NoteModel>(null);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [newNoteName, setNewNoteName] = useState('');
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<number>(null);
  const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
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
          onClick={ onNoteClick(note) }
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
    </CollectionNoteEditorContainer>
  );
};

export const CollectionNoteEditor = observer(CollectionNoteEditorBase);
