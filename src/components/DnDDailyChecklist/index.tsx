import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { IDailyChecklistItem } from '../../models/dnd';
import { Bottom1 } from '../decorators/bottom/Bottom1';
import { Left2 } from '../decorators/left/Left2';
import { Top1 } from '../decorators/top/Top1';
import { ChecklistItem } from './ChecklistItem';
import { DnDDailyChecklistContainer } from './styles';

interface IProps {
    className?: string;
}

export const DnDDailyChecklistBase: React.FC<IProps> = ({ className }) => {
    const dnd = useContext(DnDContext);

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

    const renderChecklist = () => {
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

    if (dnd.campaign.dailyChecklist.items.length === 0) return null;

    return (
        <DnDDailyChecklistContainer className={ className }>
            <Top1 className='decorator-top' />
            <Left2 className='decorator-left' />
            <div className='list-container'>
                { renderChecklist() }
            </div>
            <Bottom1 className='decorator-bottom' />
        </DnDDailyChecklistContainer>
    );
}

export const DnDDailyChecklist = observer(DnDDailyChecklistBase);
