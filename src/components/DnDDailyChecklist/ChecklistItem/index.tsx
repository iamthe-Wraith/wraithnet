import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { IDailyChecklistItem } from '../../../models/dnd';
import { AbsoluteCenter } from '../../../styles/styles';
import { Button, ButtonType } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../../LoadingSpinner';
import { Spinner } from '../../LoadingSpinner/styles';
import { EditIcon } from '../../svgs/icons/EditIcon';
import { TrashIcon } from '../../svgs/icons/TrashIcon';
import { XIcon } from '../../svgs/icons/XIcon';
import { TextArea } from '../../TextArea';
import { TextInput } from '../../TextInput';
import { ChecklistItemContainer } from './styles';

interface IProps {
    className?: string;
    item: IDailyChecklistItem;
    onChange: () => void;
    onDelete: () => void;
    onEdit: (updatedItem: IDailyChecklistItem) => void;
    processing?: boolean;
}

const from = { right: '-50px', opacity: 0 };
const to = { right: '0', opacity: 1 };

export const ChecklistItem: React.FC<IProps> = ({ className, item, onChange, onDelete, onEdit, processing }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(item.text);
    const [detailsValue, setDetailsValue] = useState(item.details || '');

    const spring = useSpring({
        config: config.gentle,
        from: from,
        to: isHovered && !isEditing ? to : from
    });

    useEffect(() => {
        if (!processing) {
            setIsEditing(false);
        }
    }, [processing]);

    const onEditCancelClick = useCallback(() => {
        setIsEditing(false);
        setTextValue(item.text);
        setDetailsValue(item.details);
    }, [item]);

    const onEditSaveClick = useCallback(() => {
        onEdit({
            ...item,
            text: textValue,
            details: detailsValue,
        });
    }, [item, textValue, detailsValue]);

    const onTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    }, []);

    const onDetailsChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setDetailsValue(e.target.value);
    }, []);

    return (
        <ChecklistItemContainer
            className={ className }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <div className='text-container'>
                    <div>
                        <Checkbox
                            checked={ false }
                            disabled={ isEditing }
                            id={ `${item.id}-checkbox` }
                            onChange={ onChange }
                        />
                    </div>
                    {
                        isEditing
                            ? (
                                <TextInput
                                    className='text-input'
                                    inputId={ `${item.id}-text`}
                                    onChange={ onTextChange }
                                    value={ textValue }
                                />
                            )
                            : <div className='text font-1'>{ item.text }</div>
                    }
                </div>
                <div>
                    {
                        isEditing
                            ? (
                                <TextArea
                                    className='details-textarea'
                                    textareaId={ `${item.id}-details` }
                                    onChange={ onDetailsChange }
                                    value={ detailsValue }
                                />
                            )
                            : <div className='details'>{ item.details }</div>
                    }
                </div>
                {
                    isEditing && (
                        <div className='edit-ctas-container'>
                            <Button
                                buttonType={ ButtonType.Primary }
                                onClick={ onEditSaveClick }
                            >
                                Save
                            </Button>
                            <Button
                                buttonType={ ButtonType.Blank }
                                onClick={ onEditCancelClick }
                            >
                                Cancel
                            </Button>
                        </div>
                    )
                }
                {
                    processing && (
                        <LoadingSpinner
                            className='saving-spinner'
                            size={ SpinnerSize.Small }
                            type={ SpinnerType.Random }
                        />
                    )
                }
            </div>
            <animated.div style={spring}>
                <Button
                    buttonType={ ButtonType.Blank }
                    className='button edit-button'
                    onClick={() => setIsEditing(true)}
                >
                    <EditIcon />
                </Button>
                <Button
                    buttonType={ ButtonType.Blank }
                    className='button delete-button'
                    onClick={ onDelete }
                >
                    <TrashIcon />
                </Button>
            </animated.div>
        </ChecklistItemContainer>
    )
}
