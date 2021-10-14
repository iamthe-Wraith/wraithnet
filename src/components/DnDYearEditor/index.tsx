import React, { ChangeEvent, useEffect, useState } from 'react';
import { IDnDYear, Reckoning } from '../../lib/dndDate';
import { Dropdown, IDropdownOption } from '../Dropdown';
import { TextInput } from '../TextInput';

import { DnDYearEditorContainer } from './styles';

interface IProps {
    className?: string;
    defaultYear: IDnDYear;
    onChange:(year: IDnDYear) => void;
}

const options: IDropdownOption<Reckoning>[] = [
    {
        context: Reckoning.DR,
        id: `dnd-year-${Reckoning.DR}`,
        text: Reckoning.DR,
    },
    {
        context: Reckoning.CR,
        id: `dnd-year-${Reckoning.CR}`,
        text: Reckoning.CR,
    },
    {
        context: Reckoning.TR,
        id: `dnd-year-${Reckoning.TR}`,
        text: Reckoning.TR,
    },
    {
        context: Reckoning.NR,
        id: `dnd-year-${Reckoning.NR}`,
        text: Reckoning.NR,
    },
    {
        context: Reckoning.MC,
        id: `dnd-year-${Reckoning.MC}`,
        text: Reckoning.MC,
    },
    {
        context: Reckoning.NY,
        id: `dnd-year-${Reckoning.NY}`,
        text: Reckoning.NY,
    },
    {
        context: Reckoning.PR,
        id: `dnd-year-${Reckoning.PR}`,
        text: Reckoning.PR,
    },
]

export const DnDYearEditor: React.FC<IProps> = ({
    className = '',
    defaultYear,
    onChange,
}) => {
    const [yearValue, setYearValue] = useState(defaultYear.num);
    const [selectedReckoning, setSelectedReckoning] = useState(defaultYear.reckoning);

    useEffect(() => {
        onChange({ num: yearValue || 1, reckoning: selectedReckoning || Reckoning.DR });
    }, [yearValue, selectedReckoning]);

    const onYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {
            const value = parseInt(e.target.value);
            if ((isNaN(value) && e.target.value === '') || !!value) {
                setYearValue(value);
            }
        };
    }

    return (
        <DnDYearEditorContainer className={ className }>
            <TextInput
                className='year-input'
                inputId='year-input'
                onChange={ onYearChange }
                type='number'
                value={ yearValue.toString() }
            />
            <Dropdown
                options={ options }
                onOptionChange={option => setSelectedReckoning(option.context)}
            />
        </DnDYearEditorContainer>
    );
}
