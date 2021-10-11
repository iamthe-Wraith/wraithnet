import React from 'react';
import { IDailyChecklistItem } from '../../../models/dnd';
import { Button, ButtonType } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { EditIcon } from '../../svgs/icons/EditIcon';
import { TrashIcon } from '../../svgs/icons/TrashIcon';
import { XIcon } from '../../svgs/icons/XIcon';
import { ChecklistItemContainer } from './styles';

interface IProps {
    className?: string;
    item: IDailyChecklistItem;
    onChange: () => void;
}

export const ChecklistItem: React.FC<IProps> = ({ className, item, onChange }) => {
    const onDeleteClick = () => {
        console.log('>>>>> deleting: ', item);
    };

    const onEditClick = () => {
        console.log('>>>>> editing: ', item);        
    };

    return (
        <ChecklistItemContainer className={ className }>
            <div>
                <div className='text-container'>
                    <div>
                        <Checkbox
                            checked={ false }
                            id={ `${item.id}-checkbox` }
                            onChange={ onChange }
                        />
                    </div>
                    <div className='text font-1'>{ item.text }</div>
                </div>
                <div>
                    <div className='details'>{ item.details }</div>
                </div>
            </div>
            <div>
                <Button
                    buttonType={ ButtonType.Blank }
                    className='button edit-button'
                    onClick={ onEditClick }
                >
                    <EditIcon />
                </Button>
                <Button
                    buttonType={ ButtonType.Blank }
                    className='button delete-button'
                    onClick={ onDeleteClick }
                >
                    <TrashIcon />
                </Button>
            </div>
        </ChecklistItemContainer>
    )
}
