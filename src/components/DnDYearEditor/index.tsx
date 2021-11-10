import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { DnDDate, IDnDYear, Reckoning } from '../../lib/dndDate';
import { Dropdown, IDropdownOption } from '../Dropdown';
import { TextInput } from '../TextInput';

import { DnDYearEditorContainer } from './styles';

interface IProps {
    className?: string;
    defaultYear: number;
    defaultReckoning: Reckoning;
    onChange:(year: number, reckoning: Reckoning) => void;
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
    defaultYear = 1,
    defaultReckoning = Reckoning.DR,
    onChange,
}) => {
    const [year, setYear] = useState(defaultYear);
    const [reckoning, setReckoning] = useState(defaultReckoning);

    useEffect(() => {
        if (!!year && !!reckoning) {
            onChange(year, reckoning);
        }
    }, [year, reckoning]);

    const onYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 5) {            
            const value = parseInt(e.target.value);
            if ((isNaN(value) && e.target.value === '') || !!value) {
                setYear(value);
            }
        };
    }, [year]);

    return (
        <DnDYearEditorContainer className={ className }>
            <TextInput
                className='year-input'
                inputId='year-input'
                onChange={ onYearChange }
                type='number'
                value={ year.toString() }
            />
            <Dropdown
                options={ options }
                onOptionChange={option => setReckoning(option.context)}
            />
        </DnDYearEditorContainer>
    );
}
