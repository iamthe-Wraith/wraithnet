import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserLogsModel } from '../../models/userLogs';
import { Button, ButtonType } from '../Button';
import { NextArrowIcon } from '../icons/NextArrowIcon';
import { PrevArrowIcon } from '../icons/PrevArrowIcon';
import { TextInput } from '../TextInput';
import { UserLogEntry } from '../UserLogEntry';

import {
    DateContainer,
    NoEntries,
    SearchContainer,
    UserLogContainer,
    UserLogHeader,
    UserLogMain,
} from './styles';

interface IProps {
    className?: string;
}

enum DateChangeDirection {
    Next = 'next',
    Prev = 'prev',
}

const UserLogBase: FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [selectedDate, setSelectedDate] = useState(dayjs().local());
    const [search, setSearch] = useState('');

    useEffect(() => {
        userLogsModel.setCriteria({ created: selectedDate.format() });
    }, [selectedDate]);

    const onClearSearchClick = () => {
        userLogsModel.setCriteria({ created: selectedDate.format() });
        setSearch('');
    }

    const onDateChangeClick = (direction: DateChangeDirection) => () => {
        setSelectedDate(selectedDate[direction === DateChangeDirection.Next ? 'add' : 'subtract'](1, 'day'));
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSearchClick = () => {
        if (search) {
            userLogsModel.setCriteria({ text: search });
        }
    };

    const onSearchKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                onSearchClick();
                break;
            default:
                break;
        }
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
        <UserLogContainer className={ className }>
            <UserLogHeader>
                <DateContainer>
                    <Button
                        className='date-arrow-button'
                        onClick={ onDateChangeClick(DateChangeDirection.Prev) }
                        type={ ButtonType.Blank }
                    >
                        <PrevArrowIcon />
                    </Button>
                    <span>{ selectedDate.format('MMM DD, YYYY') }</span>
                    <Button
                        className='date-arrow-button'
                        onClick={ onDateChangeClick(DateChangeDirection.Next) }
                        type={ ButtonType.Blank }
                    >
                        <NextArrowIcon />
                    </Button>
                </DateContainer>
                <span>entries: { userLogsModel.count }</span>
                <Link to='/'>close</Link>
            </UserLogHeader>
            <UserLogMain>
                <div>
                    { renderEntries() }
                </div>
                <div>
                    <SearchContainer>
                        <div>
                            <TextInput
                                className='search'
                                inputId='userlog-search'
                                onChange={ onSearchChange }
                                onKeyDown={ onSearchKeyDown }
                                placeholder='Search'
                                value={ search }
                            />
                            <Button
                                className='search-button'
                                onClick={ onSearchClick }
                                type={ ButtonType.PrimaryReverse }
                            >
                                Search
                            </Button>
                        </div>
                        {
                            !!search && (
                                <div>
                                    <Button
                                        className='clear-search-button'
                                        onClick={ onClearSearchClick }
                                        type={ ButtonType.Blank }
                                    >
                                        Clear search
                                    </Button>
                                </div>
                            )
                        }
                    </SearchContainer>
                </div>
            </UserLogMain>
        </UserLogContainer>
    )
};

export const UserLog = observer(UserLogBase);