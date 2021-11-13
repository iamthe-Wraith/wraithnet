import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { IDailyChecklistItem } from '../../models/dnd/daily-checklist';
import { Button, ButtonType } from '../Button';
import { Bottom1 } from '../decorators/bottom/Bottom1';
import { Left2 } from '../decorators/left/Left2';
import { Top1 } from '../decorators/top/Top1';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal } from '../Modal';
import { TextArea } from '../TextArea';
import { TextInput } from '../TextInput';
import { ChecklistItem } from './ChecklistItem';
import { DnDDailyChecklistContainer } from './styles';

interface IProps {
    className?: string;
}

export const DnDDailyChecklistBase: React.FC<IProps> = ({ className }) => {
    const dnd = useContext(DnDContext);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [newItemDetails, setNewItemDetails] = useState('');
    const list = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dnd.campaign.dailyChecklist.load()
            .catch (err => {
                console.error('>>>>> error getting daily checklist: ', err);
            });
    }, []);

    const onAddItemClick = () => {
        setShowAddItemModal(true);
    }

    const onItemCheckedChange = (item: IDailyChecklistItem) => () => {
        console.log('checking item: ', item);
    }

    const onItemDelete = (item: IDailyChecklistItem) => () => {
        dnd.campaign.dailyChecklist.delete(item)
            .catch((err: any) => {
                console.error('error deleting item', err);
            })
    }

    const onItemEdit = (item: IDailyChecklistItem) => (updatedItem: IDailyChecklistItem) => {
        dnd.campaign.dailyChecklist.update(updatedItem)
            .catch((err: any) => {
                console.error('error updating item', err);
            });
    }

    const onNewItemTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemText(e.target.value);
    }

    const onNewItemDetailsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewItemDetails(e.target.value);
    }

    const onSaveNewItem = () => {
        const item = {
            text: newItemText,
            details: newItemDetails,
        } as IDailyChecklistItem;
        dnd.campaign.dailyChecklist.addItem(item)
            .then(() => {
                onCancelNewItem();
                list.current.scrollTo({
                    top: list.current.scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    const onCancelNewItem = () => {
        setNewItemText('');
        setNewItemDetails('');
        setShowAddItemModal(false);
    }

    const renderChecklist = () => {
        if (dnd.campaign.dailyChecklist.items.length === 0) {
          return <div className='no-items'>no items found</div>
        }

        return dnd.campaign.dailyChecklist.items.map(item => (
            <ChecklistItem
                className='checklist-item'
                item={ item }
                key={ item.id }
                onChange={ onItemCheckedChange(item) }
                onDelete={ onItemDelete(item) }
                onEdit={ onItemEdit(item) }
                processing={ dnd.campaign.dailyChecklist.updatingItemId === item.id || dnd.campaign.dailyChecklist.deletingItemId === item.id }
            />
        ));
    }

    return (
        <DnDDailyChecklistContainer className={ className }>
            <Top1 className='decorator-top' />
            <Left2 className='decorator-left' />
            <div className='list-container' ref={ list }>
                { renderChecklist() }
            </div>
            <div className='add-item-container'>
                <Button
                    buttonType={ ButtonType.BlankReverse }
                    onClick={ onAddItemClick }
                >
                    + add item
                </Button>
            </div>
            <Bottom1 className='decorator-bottom' />
            <Modal
                className='text-input'
                isOpen={ showAddItemModal }
                header='Add Checklist Item'
                onClose={ onCancelNewItem }
            >
                <TextInput
                    inputId='new-checklist-item-input'
                    onChange={ onNewItemTextChange }
                    value={ newItemText }
                />
                <div className='label'>Details</div>
                <TextArea
                    className='details-textarea'
                    textareaId='new-checklist-item-details'
                    onChange={ onNewItemDetailsChange }
                    value={ newItemDetails }
                />
                <div className='ctas-container'>
                    <Button
                        buttonType={ ButtonType.Primary }
                        disabled={ !newItemText }
                        onClick={ onSaveNewItem }
                    >
                        save
                    </Button>
                    <Button
                        buttonType={ ButtonType.BlankReverse }
                        onClick={ onCancelNewItem }
                    >
                        cancel
                    </Button>
                </div>
                {
                    dnd.campaign.dailyChecklist.isAddingItem && (
                        <LoadingSpinner
                            size={ SpinnerSize.Small }
                            type={ SpinnerType.Random }
                        />
                    )
                }
            </Modal>
        </DnDDailyChecklistContainer>
    );
}

export const DnDDailyChecklist = observer(DnDDailyChecklistBase);
