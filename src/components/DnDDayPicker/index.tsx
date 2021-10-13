import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { DnDDate } from '../../lib/dndDate';
import { dndCalendar, DnDMonthOrder, IDnDCalendarDay } from '../../static/dnd-calendar';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { NextArrowIcon } from '../svgs/icons/NextArrowIcon';
import { PrevArrowIcon } from '../svgs/icons/PrevArrowIcon';

import { Day, DnDDayPickerContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    daysWithEvents?: DnDDate[];
    onDayClick?:(day: DnDDate) => void;
    selectedDay?: DnDDate;
}

export const DnDDayPickerBase: React.FC<IProps> = ({
    className = '',
    daysWithEvents = [],
    onDayClick,
    selectedDay = new DnDDate(),
    theme,
}) => {
    const [mSelectedDay, setSelectedDay] = useState(selectedDay);
    const [month, setMonth] = useState(selectedDay.month);
    const [year, setYear] = useState(selectedDay.year);
    const [days, setDays] = useState(dndCalendar.filter(d => d.month === selectedDay.month).map(d => new DnDDate(d, year)));
    const [specialDays, setSpecialDays] = useState<DnDDate[]>([]);
    const [dayHovered, setDayHovered] = useState<DnDDate>(null);

    useEffect(() => {
        setSelectedDay(selectedDay);
    }, [selectedDay]);

    useEffect(() => {
        setMonth(selectedDay.month);
    }, [selectedDay]);

    useEffect(() => {
        let lastIndex = 0;
        setDays(dndCalendar
            .filter((d, i) => {
                if (d.month === month && !d.special) {
                    lastIndex = i;
                    return true;
                }

                return false;
            })
            .map(d => new DnDDate(d, year)));

        // get special days
        const _specialDays: DnDDate[] = [];
        while (dndCalendar[lastIndex + 1]?.special) {
            _specialDays.push(new DnDDate(dndCalendar[lastIndex + 1], year));
            lastIndex += 1;
        }
        setSpecialDays(_specialDays);
    }, [month]);

    const mOnDayClick = (d: DnDDate) => {
        setSelectedDay(d);
        onDayClick?.(d);
    };

    const onNextMonthClick = () => {
        let index = DnDMonthOrder.indexOf(month) + 1;
        if (index >= DnDMonthOrder.length) {
            index = 0;
            setYear({ num: (year.num + 1), reckoning: year.reckoning });
        }
        setMonth(DnDMonthOrder[index]);
    };

    const onPrevMonthClick = () => {
        let index = DnDMonthOrder.indexOf(month) - 1;
        if (index < 0) {
            index = DnDMonthOrder.length - 1;
            if (year.num > 1) {
                setYear({ num: (year.num + 1), reckoning: year.reckoning });
            }
        }
        setMonth(DnDMonthOrder[index]);
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
            if (year.num % d.holiday.iteration === 0) {
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

    return (
        <DnDDayPickerContainer className={ className }>
            <div className='header'>
                <Button
                    buttonType={ ButtonType.Blank }
                    onClick={ onPrevMonthClick }
                >
                    <PrevArrowIcon fill={ theme.light } />
                </Button>
                <div className='month-display'>{ `${month}, ${year.num} ${year.reckoning}` }</div>
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