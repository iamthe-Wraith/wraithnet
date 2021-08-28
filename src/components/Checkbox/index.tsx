import React, { FC } from 'react';
import { noop } from '../../lib/utils';
import { XIcon } from '../icons/XIcon';
import { Box, CheckboxContainer } from './styles';

interface IProps {
    checked: boolean;
    id: string;
    label?: JSX.Element;
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
    id,
    label,
    onChange,
    position = CheckboxLabelPosition.Right,
    type = CheckboxType.Light,
}) => {
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }

    return (
        <CheckboxContainer htmlFor={ id }>
            <input
                checked={ checked }
                hidden
                id={ id }
                onChange={ onCheckboxChange }
                type='checkbox'
            />
            { label && position === CheckboxLabelPosition.Left && label }
            <Box className={ `${type} ${checked && 'checked'}` }>
                { checked && <XIcon fill='none' /> }
            </Box>
            { label && position === CheckboxLabelPosition.Right && label }
        </CheckboxContainer>
    )
}