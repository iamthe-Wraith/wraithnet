import { observer } from 'mobx-react';
import React, { FC, useContext } from 'react';
import { TimeContext } from '../../contexts/Time';
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

const TimeBase: FC<IProps> = ({
    className = '',
    hideSeconds,
    hideAmPm,
    hoursClassName = '',
    minutesClassName = '',
    secondsClassName = '',
    amPmClassName = '',
    colonClassName = '',
}) => {
    const time = useContext(TimeContext);

    const renderTime = () => {
        let pieces = [
            <span key='hours' className={ `hours ${hoursClassName}` }>{ time.now.format('h') }</span>,
            <span key='colon-1' className={ `colon ${colonClassName}` }>:</span>,
            <span key='minutes' className={ `minutes ${minutesClassName}` }>{ time.now.format('mm') }</span>,
        ];

        if (!hideSeconds) {
            pieces = [
                ...pieces,
                <span key='colon-2' className={ `colon ${colonClassName}` }>:</span>,
                <span key='seconds' className={ `seconds ${secondsClassName}` }>{ time.now.format('ss') }</span>,
            ];
        }

        if (!hideAmPm) {
            pieces = [
                ...pieces,
                <span key='ampm' className={ `ampm ${amPmClassName}` }>{ time.now.format('a') }</span>,
            ];
        }
        
        return pieces;
    };

    return (
        <TimeContainer className={ className }>
            { renderTime() }
        </TimeContainer>
    );
};

export const Time = observer(TimeBase);