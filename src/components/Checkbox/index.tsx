import React, { FC } from 'react';
import { XIcon } from '../svgs/icons/XIcon';
import { Box, CheckboxContainer } from './styles';

interface IProps {
    checked: boolean;
    className?: string;
    disabled?: boolean;
    id: string;
    label?: string | JSX.Element;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    position?: CheckboxLabelPosition;
    type?: CheckboxType;
}

export enum CheckboxType {
    Light = 'light',
    Primary = 'primary',
    Secondary = 'secondary',
}

export enum CheckboxLabelPosition {
    Left = 'left',
    Right = 'right'
}

export const Checkbox: FC<IProps> = ({
    checked,
    className = '',
    disabled,
    id,
    label,
    onChange,
    position = CheckboxLabelPosition.Right,
    type = CheckboxType.Light,
}) => {
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <CheckboxContainer
            htmlFor={ id }
            className={ className }
        >
            <input
                checked={ checked }
                disabled={ disabled }
                hidden
                id={ id }
                onChange={ onCheckboxChange }
                type='checkbox'
            />
            { label && position === CheckboxLabelPosition.Left && label }
            <Box className={ `${type} ${checked && 'checked'} ${disabled && 'disabled'}` }>
                { checked && <XIcon fill='none' /> }
            </Box>
            { label && position === CheckboxLabelPosition.Right && label }
        </CheckboxContainer>
    );
};