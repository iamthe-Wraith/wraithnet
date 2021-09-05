import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { TimeContainer } from './styles';

interface IProps {
    className?: string;
    hideAmPm?: boolean;
    hideSeconds?: boolean;
    hoursClassName?: string;
    minutesClassName?: string;
    secondsClassName?: string;
    amPmClassName?: string;
    colonClassName?: string;
}

export const Time: FC<IProps> = ({
    className = '',
    hideSeconds,
    hideAmPm,
    hoursClassName = '',
    minutesClassName = '',
    secondsClassName = '',
    amPmClassName = '',
    colonClassName = '',
}) => {
    const [time, setTime] = useState(dayjs().local());
    const [timeout, setTimeout] = useState<number>(null);
    
    useEffect(() => {
        clearTimeout(timeout);
        setTimeout(window.setTimeout(() => {
            setTime(dayjs().local());
        }, 1000));
    }, [time]);

    const renderTime = () => {
        let pieces = [
            <span key='hours' className={ `hours ${hoursClassName}`}>{ time.format('h') }</span>,
            <span key='colon-1' className={ `colon ${colonClassName}`}>:</span>,
            <span key='minutes' className={ `minutes ${minutesClassName}`}>{ time.format('mm') }</span>
        ];

        if (!hideSeconds) {
            pieces = [
                ...pieces,
                <span key='colon-2' className={ `colon ${colonClassName}`}>:</span>,
                <span key='seconds' className={ `seconds ${secondsClassName}`}>{ time.format('ss') }</span>
            ];
        }

        if (!hideAmPm) {
            pieces = [
                ...pieces,
                <span key='ampm' className={ `ampm ${amPmClassName}`}>{ time.format('a') }</span>,
            ];
        }
        
        return pieces;
    }

    return (
        <TimeContainer className={ className }>
            { renderTime() }
        </TimeContainer>
    )
};