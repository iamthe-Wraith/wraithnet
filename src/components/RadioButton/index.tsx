import React, { ChangeEvent } from 'react';
import { RadioButtonContainer } from './styles';

interface IProps {
    className?: string;
    name: string;
    checked: boolean;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButton: React.FC<IProps> = ({
    className = '',
    name,
    checked,
    onChange,
}) => {
    const onRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <RadioButtonContainer className={ className }>
            <input
                type='radio'
                name={ name }
                checked={ checked }
                onChange={ onRadioButtonChange }
            />
            <div className='radio-button' />
        </RadioButtonContainer>
    );
};
