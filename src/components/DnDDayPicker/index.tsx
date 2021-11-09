import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { withTheme } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { DnDDate, IDnDYear, Reckoning } from '../../lib/dndDate';
import { dndCalendar, DnDMonthOrder, IDnDCalendarDay } from '../../static/dnd-calendar';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { DnDYearEditor } from '../DnDYearEditor';
import { NextArrowIcon } from '../svgs/icons/NextArrowIcon';
import { PrevArrowIcon } from '../svgs/icons/PrevArrowIcon';
import { PopoverType, TinyPopover } from '../TinyPopover';

import { Day, DnDDayPickerContainer } from './styles';

interface IProps extends IThemeProps {
    allowYearEdit?: boolean;
    className?: string;
    daysWithEvents?: DnDDate[];
    onDayClick?:(day: DnDDate) => void;
    selectedDay?: string;
}

const DnDDayPickerBase: React.FC<IProps> = ({
    allowYearEdit,
    className = '',
    daysWithEvents = [],
    onDayClick,
    selectedDay,
    theme,
}) => {
    const dnd = useContext(DnDContext)
    const [mSelectedDay, setSelectedDay] = useState(new DnDDate(selectedDay));
    const [days, setDays] = useState<DnDDate[]>([]);
    const [specialDays, setSpecialDays] = useState<DnDDate[]>([]);
    const [dayHovered, setDayHovered] = useState<DnDDate>(null);

    useEffect(() => {
        setSelectedDay(new DnDDate(selectedDay));
    }, [selectedDay]);



    useEffect(() => {        
        let lastIndex = 0;
        setDays(dndCalendar
            .filter((d, i) => {
                if (d.month === mSelectedDay.month && !d.special) {
                    lastIndex = i;
                    return true;
                }

                return false;
            })
            .map(d => new DnDDate(`${d.date} ${d.month}, ${mSelectedDay.year} ${mSelectedDay.reckoning}`)));

        // get special days
        const _specialDays: DnDDate[] = [];
        while (dndCalendar[lastIndex + 1]?.special) {
            const { month, holiday } = dndCalendar[lastIndex + 1];
            _specialDays.push(new DnDDate(`${holiday?.name}, ${mSelectedDay.year} ${mSelectedDay.reckoning}`));
            lastIndex += 1;
        }
        setSpecialDays(_specialDays);
    }, [mSelectedDay]);

    const mOnDayClick = (d: DnDDate) => {
        const day = new DnDDate(d.stringify());
        day.year = mSelectedDay.year;
        day.reckoning = mSelectedDay.reckoning;
        
        setSelectedDay(day);
        onDayClick?.(day);
    };

    const onNextMonthClick = () => {
        const clone = mSelectedDay.clone();
        let index = DnDMonthOrder.indexOf(mSelectedDay.month) + 1;
        if (index >= DnDMonthOrder.length) {
            index = 0;
            clone.year += 1;
        }
        clone.month = DnDMonthOrder[index];
        setSelectedDay(clone);
    };

    const onPrevMonthClick = () => {
        const clone = mSelectedDay.clone();
        let index = DnDMonthOrder.indexOf(mSelectedDay.month) - 1;
        if (index < 0) {
            index = DnDMonthOrder.length - 1;
            if (clone.year > 1) {
                clone.year -= 1;
            }
        }
        clone.month = DnDMonthOrder[index];
        setSelectedDay(clone);
    };

    const render10Days = () => {
        let tenDays: JSX.Element[] = [];
        for (let i = 1; i <= 10; i++) {
            tenDays.push((
                <div
                    key={ `ten-day-${i}` }
                    className='ten-day'
                >
                    { `${i}${ i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th' }` }
                </div>
            ));
        }
        return tenDays;
    };

    const renderDays = () => {
        return days.map(d => {
            let classes: string[] = [];

            if (d.isSame(mSelectedDay)) classes.push('today');
            if (d.isSame(mSelectedDay)) classes.push('selected');

            const hasEvent = !!d.holiday || daysWithEvents.find(dwe => dwe.isSame(d));
            if (hasEvent) classes.push('event');


            return (
                <Day
                    className={ `${classes.join(' ')}` }
                    key={ `day-${d.date}` }
                    buttonType={ ButtonType.Blank }
                    onClick={() => mOnDayClick(d)}
                >
                    { d.date }
                </Day>
            );
        });
    };

    const renderSpecialDays = () => {
        if (!specialDays?.length) return null;

        const sDays: JSX.Element[] = [];
        specialDays.forEach((d, i) => {
            if (mSelectedDay.year % d.holiday.iteration === 0) {
                sDays.push((
                    <Button
                        key={ `special-day-${i}` }
                        buttonType={ ButtonType.Blank }
                        className='day-button'
                        onClick={() => mOnDayClick(d)}
                        onMouseEnter={() => setDayHovered(d)}
                        onMouseLeave={() => setDayHovered(null)}
                    >
                        <AngleCorner
                            backgroundColor={ (d.isSame(mSelectedDay) || d.isSame(dayHovered)) ? `${theme.primary}50` : `${theme.darkestGray}` }
                            borderWidth={ 1 }
                            borderColor={ (d.isSame(mSelectedDay) || d.isSame(dayHovered)) ? theme.primary : theme.darkGray }
                            className='special-day'
                            config={[{ size: AngleSize.Tiny, position: AnglePos.TopRight }]}
                        >
                            <span>{ d.holiday.name }</span>
                            {
                                !!d.holiday.alternativeNames?.length && (
                                    <span>({ d.holiday.alternativeNames.join(', ') })</span>
                                )
                            }
                        </AngleCorner>
                    </Button>
                ));
            }
        });

        return (
            <div className='special-days-container'>
                { sDays }
            </div>
        );
    }

    const onYearChange = (year: number, reckoning: Reckoning) => {
        const clone = mSelectedDay.clone();
        clone.year = year;
        clone.reckoning = reckoning;
        setSelectedDay(clone);
    }

    return (
        <DnDDayPickerContainer className={ className }>
            {
                allowYearEdit && (
                    <div className='year-editor-container'>
                        <DnDYearEditor
                            defaultYear={ mSelectedDay.year }
                            defaultReckoning={ mSelectedDay.reckoning }
                            onChange={ onYearChange }
                        />
                    </div>
                )
            }
            <div className='header'>
                <Button
                    buttonType={ ButtonType.Blank }
                    onClick={ onPrevMonthClick }
                >
                    <PrevArrowIcon fill={ theme.light } />
                </Button>
                <div className='month-display'>{ `${mSelectedDay.month}, ${mSelectedDay.year} ${mSelectedDay.reckoning}` }</div>
                <Button
                    buttonType={ ButtonType.Blank }
                    onClick={ onNextMonthClick }
                >
                    <NextArrowIcon fill={ theme.light } />
                </Button>
            </div>
            <div className='days-container'>
                { render10Days() }
                { renderDays() }
            </div>
            { renderSpecialDays() }
        </DnDDayPickerContainer>
    );
}

export const DnDDayPicker = withTheme(DnDDayPickerBase);