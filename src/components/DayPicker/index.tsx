import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactDayPicker, { DateUtils, DayModifiers, Modifier, RangeModifier } from 'react-day-picker';
import { DayPickerProps, NavbarElementProps } from 'react-day-picker/types/props';
import dayjs from 'dayjs';
import { PrevArrowIcon } from '../icons/PrevArrowIcon';
import { NextArrowIcon } from '../icons/NextArrowIcon';
import { Button, ButtonType } from '../Button';
import { Day, DayPickerContainer, NavBarContainer } from './styles';
import { OBSERVABLE_SHALLOW } from 'mobx/dist/internal';

interface IProps extends DayPickerProps, INavBarNavigationHooks {
    className?: string;
    defaultDateRange?: RangeModifier,
    disableNextButton?: boolean,
    disablePrevButton?: boolean,
    defaultSelectedDay?: Date;
    onChange?: (date: Date) => void;
    onDateRangeChange?: (range: RangeModifier) => void;
    showDate?: boolean;
    showReset?: boolean;
}

interface INavBarNavigationHooks {
	onWillChangeToNextMonth?(e: React.MouseEvent<HTMLElement>, currentlyDisplayedMonth: Date, nextMonth?: Date): void;
	onWillChangeToPreviousMonth?(e: React.MouseEvent<HTMLElement>, currentlyDisplayedMonth: Date, prevMonth?: Date): void;
	disableNextButton?: boolean,
    disablePrevButton?: boolean,
}

const NavBar: React.FC<IProps & NavbarElementProps & Partial<INavBarNavigationHooks>> = ({
    className,
    disablePrevButton,
    disableNextButton,
    previousMonth,
    nextMonth,
    localeUtils,
    locale,
    onWillChangeToNextMonth,
    onWillChangeToPreviousMonth,
    onNextClick,
    onPreviousClick,
}) => {
	const month = !!previousMonth
        ? dayjs(previousMonth).add(1, 'month')
		: dayjs(nextMonth).subtract(1, 'month');

	const monthName = localeUtils.getMonths(locale)[month.month()];

	const onPrevMonthClicked = (e: React.MouseEvent<HTMLElement>) => {
		onWillChangeToPreviousMonth?.(e, previousMonth);
		e.stopPropagation();
		if (e.defaultPrevented) {
			return;
		}
		e.preventDefault();
		onPreviousClick();
	};

	const onNextMonthClicked = (e: React.MouseEvent<HTMLElement>) => {
		onWillChangeToNextMonth?.(e, nextMonth);
		e.stopPropagation();
		if (e.defaultPrevented) {
			return;
		}
		e.preventDefault();
		onNextClick();
	};

	return (
		<NavBarContainer className={ className }>
			<Button
                disabled={ disablePrevButton }
                onClick={ onPrevMonthClicked }
                className='daypicker-button daypicker-prev-button'
                type={ ButtonType.Blank }
            >
				<PrevArrowIcon className='daypicker-button-icon' />
			</Button>
			<div className='daypicker-month'>
				{ `${ monthName }, ${ month.year() }` }
			</div>
			<Button
                disabled={ disableNextButton }
                onClick={ onNextMonthClicked }
                className='daypicker-button daypicker-next-button'
                type={ ButtonType.Blank }
            >
				<NextArrowIcon className='daypicker-button-icon' />
			</Button>
		</NavBarContainer>
	);
};

const NavBarWithNavigationHooks = (hooks?: INavBarNavigationHooks): React.FC<NavbarElementProps> => (props) => {
	return (
		<NavBar
			{ ...props }
			{ ...hooks }
		/>
	);
};

export const dayPickerDefaultDateRange: RangeModifier = {
    from: null,
    to: null,
};

export const DayPicker: FC<IProps> = ({
    className = '',
    defaultDateRange,
    disableNextButton,
    disablePrevButton,
    defaultSelectedDay,
    onChange,
    onDateRangeChange,
    onDayClick,
    onWillChangeToNextMonth,
    onWillChangeToPreviousMonth,
    selectedDays,
    showDate,
    showReset,
    ...restProps
}) => {
    const [dateRange, setDateRange] = useState<RangeModifier>(defaultDateRange ?? dayPickerDefaultDateRange);
    const [selectedDate, setSelectedDate] = useState(defaultSelectedDay ?? new Date());
    const defaultDateRangeRef = useRef(dateRange).current;
    const defaultSelectedDayRef = useRef(selectedDate).current;
    const [navbar, setNavbar] = useState<FC<NavbarElementProps>>(NavBarWithNavigationHooks({
        disableNextButton: disableNextButton ?? false,
		disablePrevButton: disablePrevButton ?? false,
        onWillChangeToNextMonth,
		onWillChangeToPreviousMonth,
    }));

    useEffect(() => {
        setNavbar(NavBarWithNavigationHooks({
            disableNextButton: disableNextButton ?? false,
            disablePrevButton: disablePrevButton ?? false,
            onWillChangeToNextMonth,
            onWillChangeToPreviousMonth,
        }));
    }, [disableNextButton, disablePrevButton]);

    useEffect(() => {
        if (onDateRangeChange) onDateRangeChange(dateRange);
        if (onChange) onChange(selectedDate);
    }, [dateRange, selectedDate]);

    const onDayPickerDayClick = useCallback((d: Date, modifiers: DayModifiers) => {
        if (!modifiers.disabled) {
            if (onDateRangeChange) {
                const range = DateUtils.addDayToRange(d, dateRange);
                setDateRange(range);
            } else {
                setSelectedDate(d);   
            }
        }
    }, [dateRange, selectedDate]);

    const onRenderDay = (day: Date, modifiers: DayModifiers): React.ReactNode => {
        let classes = '';

        if (modifiers.disabled) {
            classes = `disabled ${classes}`;
        }

        if (modifiers.selected || (modifiers.start && modifiers.end)) {
            classes = `selected ${classes}`;
        }

        if (modifiers.today) {
            classes = `today ${classes}`;
        }

        if (dateRange.from && dateRange.to) {
            const from = dayjs(dateRange.from);
            const to = dayjs(dateRange.to);
            const thisDay = dayjs(day);
            let isSame = from.isSame(to, 'date');

            if (!isSame) {
                if (modifiers.start) {
                    classes = `start ${classes}`;
                }
    
                if (modifiers.end) {
                    classes = `end ${classes}`;
                }

                if (thisDay.isAfter(from, 'date') && thisDay.isBefore(to, 'date')) {
                    classes += `selected ${classes}`;
                }
            }
        } else if ((dateRange.from || dateRange.to) && !classes.includes('selected') && (modifiers.start || modifiers.end)) {
            classes = `selected ${classes}`;
        }

        return <Day className={ classes }>{ day.getDate() }</Day>
    }

    const onResetDatesClick = () => {
        if (onDateRangeChange) setDateRange(defaultDateRangeRef);
        if (onChange) setSelectedDate(defaultSelectedDayRef);
    }

    const renderDateString = () => {
        const format = 'MMM DD';

        if (onDateRangeChange) {
            if (!dateRange.from && !dateRange.to) return '--';
            if (dateRange.from && !dateRange.to) return dayjs(dateRange.from).format(format);
            if (dateRange.to && !dateRange.from) return dayjs(dateRange.to).format(format);
            return `${dayjs(dateRange.from).format(format)} - ${dayjs(dateRange.to).format(format)}`;
        }

        if (onChange) {
            return dayjs(selectedDate).format(format);
        }
    }

    return (
        <DayPickerContainer className={ className }>
            <ReactDayPicker
                { ...restProps }
                modifiers={ onDateRangeChange ? { start: dateRange.from, end: dateRange.to } : null }
                navbarElement={ navbar }
                onDayClick={ onDayClick ?? onDayPickerDayClick }
                renderDay={ onRenderDay }
                selectedDays={ onChange ? selectedDate : null }
            />
            <div className='dates-container'>
                <span>{ showDate ? renderDateString() : null }</span>
                {
                    showReset && (
                        <Button
                            type={ ButtonType.Link }
                            onClick={ onResetDatesClick }
                        >
                            { `Reset date${ onDateRangeChange ? 's' : '' }` }
                        </Button>
                    )
                }
            </div>
        </DayPickerContainer>
    );
};
