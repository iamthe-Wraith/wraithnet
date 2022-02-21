import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { DnDContext } from '../../contexts/DnD';
import { NoteModel } from '../../models/notes';
import { TagModel } from '../../models/tags';
import { Button, ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { TagsList } from '../TagsList';
import { TextInput } from '../TextInput';

import { AddItemToInventoryModalContainer, FilterContainer, ItemListContainer, ItemsList, NoItems, SearchContainer } from './styles';

interface IProps {
    className?: string;
    defaultItems?: NoteModel[];
    isOpen: boolean;
    onCancel(): void;
    onSave(items: NoteModel[]): void;
    saving?: boolean;
}

interface IItemsSearchParams {
    tags?: string[];
    name?: string;
}

const AddItemToInventoryModalBase: React.FC<IProps> = ({
    className = '',
    defaultItems = [],
    isOpen,
    onCancel,
    onSave,
    saving,
}) => {
    const dnd = useContext(DnDContext);
    const [selectedItems, setSelectedItems] = useState<NoteModel[]>(defaultItems);
    const searchEngaged = useRef(false);
    const tagsEngaged = useRef(false);
    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<number>(null);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    const getQueryParams = () => {
        const queryParams: IItemsSearchParams = {};
        if (search) queryParams.name = search;
        if (selectedTags.length) queryParams.tags = selectedTags.map(t => t.id);  
        return queryParams;
    };

    const loadMore = () => {
        dnd.campaign.items.loadMore(getQueryParams())
            .catch(err => {
                console.log('error loading items');
                console.log(err);
            });
    };

    useEffect(() => {
        if (!dnd.campaign.items.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (!!defaultItems && defaultItems.length !== selectedItems.length) {
            setSelectedItems(defaultItems || []);
        }
    }, [defaultItems]);

    useEffect(() => {
        if (searchEngaged.current || tagsEngaged.current) {
            window.clearTimeout(searchTimeout);
            setSearchTimeout(window.setTimeout(() => {         
                dnd.campaign.items.refresh(getQueryParams())
                    .catch(err => {
                        console.error(err);
                    });
            }, 300));
        }
    }, [search, selectedTags]);

    const onItemClick = useCallback((item: NoteModel) => () => {
        const isSelected = selectedItems.find(i => i.id === item.id);
        let updatedItems: NoteModel[] = [...selectedItems];
        if (isSelected) {
            updatedItems = updatedItems.filter(i => i.id !== item.id);
        } else {
            updatedItems.push(item);
        }
        setSelectedItems(updatedItems);
    }, [selectedItems]);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        searchEngaged.current = true;
        setSearch(e.target.value);
    };

    const onSelectedTagsChange = (selectedTags: TagModel[]) => {
        tagsEngaged.current = true;
        setSelectedTags(selectedTags);
    };

    const renderItems = () => {
        let items: JSX.Element[] = [];

        if (dnd.campaign.items.results.length === 0) {
            items.push((
                <NoItems key='no-items-found'>
                    no items found.
                    <br />
                    add some items <Link to='/items'>here</Link>.
                </NoItems>
            ));
        }

        items = dnd.campaign.items.results.map(item => {
            const isSelected = selectedItems.find(i => i.id === item.id);

            return (
                <Button
                    key={ item.id }
                    className={ `item-to-add ${isSelected ? 'selected' : ''}` }
                    buttonType={ ButtonType.Blank }
                    onClick={ onItemClick(item) }
                >
                    { item.name }
                </Button>
            );
        });

        if (dnd.campaign.items.busy) {
            items.push(<LoadingSpinner key='loading-spinner' size={ SpinnerSize.Small } />);
        }

        if (!dnd.campaign.items.allResultsFetched && !dnd.campaign.items.busy) {
            items.push(<Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />);
        }

        return (
            <ItemsList>
                { items }
            </ItemsList>
        );
    };

    return (
        <AddItemToInventoryModalContainer
            className={ className }
            header='Select Items'
            isOpen={ isOpen }
            onClose={ onCancel }
        >
            <FilterContainer>
                <SearchContainer>
                    <TextInput
                        inputId={ `add-item-search-input` }
                        onChange={ onSearchChange }
                        placeholder={ `Search items`  }
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
            <ItemListContainer>
                { renderItems() }
                <CTAs
                    ctas={ [
                        {
                            disabled: dnd.campaign.items.busy || selectedItems.length === 0,
                            text: 'Save',
                            type: ButtonType.Primary,
                            onClick: () => onSave(selectedItems),
                        },
                        {
                            text: 'Cancel',
                            type: ButtonType.Blank,
                            onClick: onCancel,
                        },
                    ] }
                />
                { saving && <LoadingSpinner size={ SpinnerSize.Small } /> }
            </ItemListContainer>
        </AddItemToInventoryModalContainer>
    );
};

export const AddItemToInventoryModal = observer(AddItemToInventoryModalBase);
