import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserLogsModel } from '../../models/userLogs';
import { Button, ButtonType } from '../Button';
import { NextArrowIcon } from '../icons/NextArrowIcon';
import { PrevArrowIcon } from '../icons/PrevArrowIcon';
import { UserLogEntry } from '../UserLogEntry';

import {
    DateContainer,
    NoEntries,
    UserLogContainer,
    UserLogEntries,
    UserLogHeader
} from './styles';

interface IProps {
    className?: string;
}

enum DateChangeDirection {
    Next = 'next',
    Prev = 'prev',
}

const UserLogBase: React.FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [selectedDate, setSelectedDate] = useState(dayjs().local());

    useEffect(() => {
        userLogsModel.setCriteria({ created: selectedDate.format() });
    }, [selectedDate]);

    const onDateChangeClick = (direction: DateChangeDirection) => () => {
        setSelectedDate(selectedDate[direction === DateChangeDirection.Next ? 'add' : 'subtract'](1, 'day'));
    }

    const renderEntries = () => {
        if (userLogsModel.entries.length === 0) {
            return (
                <NoEntries>
                    No entries found
                </NoEntries>
            );
        }

        return userLogsModel.entries.map(entry => <UserLogEntry key={ entry.id } entry={ entry } />);
    }

    return (
        <UserLogContainer>
            <UserLogHeader>
                <DateContainer>
                    <Button
                        onClick={ onDateChangeClick(DateChangeDirection.Prev) }
                        type={ ButtonType.Blank }
                    >
                        <PrevArrowIcon className='date-arrow-button' />
                    </Button>
                    <span>{ selectedDate.format('MMM DD, YYYY') }</span>
                    <Button
                        onClick={ onDateChangeClick(DateChangeDirection.Next) }
                        type={ ButtonType.Blank }
                    >
                        <NextArrowIcon className='date-arrow-button' />
                    </Button>
                </DateContainer>
                <span>entries: { userLogsModel.count }</span>
                <Link to='/'>close</Link>
            </UserLogHeader>
            <UserLogEntries>
                { renderEntries() }
            </UserLogEntries>
        </UserLogContainer>
    )
};

export const UserLog = observer(UserLogBase);