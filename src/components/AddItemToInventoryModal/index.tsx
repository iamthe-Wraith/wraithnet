import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { DnDContext } from '../../contexts/DnD';
import { NoteModel } from '../../models/notes';
import { Button, ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';

import { AddItemToInventoryModalContainer, ItemsList, NoItems } from './styles';

interface IProps {
    className?: string;
    defaultItems?: NoteModel[];
    isOpen: boolean;
    onCancel(): void;
    onSave(items: NoteModel[]): void;
    saving?: boolean;
}

export const AddItemToInventoryModal: React.FC<IProps> = ({
    className = '',
    defaultItems = [],
    isOpen,
    onCancel,
    onSave,
    saving
}) => {
    const dnd = useContext(DnDContext);
    const [selectedItems, setSelectedItems] = useState<NoteModel[]>(defaultItems);

    const loadMore = () => {
        dnd.campaign.items.loadMore()
            .catch(err => {
                console.log('error loading items');
                console.log(err);
            });
    }

    useEffect(() => {
        if (!dnd.campaign.items.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (!!defaultItems && defaultItems.length !== selectedItems.length) {
            setSelectedItems(defaultItems || []);
        }
    }, [defaultItems]);

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

    const renderItems = () => {
        let items: JSX.Element[] = [];

        if (dnd.campaign.items.results.length === 0) {
            items.push((
                <NoItems key='no-items-found'>
                    no items found.
                    <br />
                    add some items <Link to='/items'>here</Link>.
                </NoItems>
            ))
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
            )
        });

        if (!dnd.campaign.items.allResultsFetched && !dnd.campaign.items.busy) {
            items.push(<Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />)
        }

        return (
            <ItemsList>
                { items }
            </ItemsList>
        );
    }

    return (
        <AddItemToInventoryModalContainer
            className={ className }
            header='Select Items'
            isOpen={ isOpen }
            onClose={ onCancel }
        >
            {
                dnd.campaign.items.busy
                    ? <LoadingSpinner size={ SpinnerSize.Small } />
                    : renderItems()
            }
            <CTAs
                ctas={[
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
                    }
                ]}
            />
            { saving && <LoadingSpinner size={ SpinnerSize.Small } /> }
        </AddItemToInventoryModalContainer>
    );
}
