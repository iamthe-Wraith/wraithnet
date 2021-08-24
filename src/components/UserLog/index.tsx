import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserLogsModel } from '../../models/userLogs';
import { UserLogEntry } from '../UserLogEntry';

import { UserLogContainer, UserLogEntries, UserLogHeader } from './styles';

interface IProps {
    className?: string;
}

const UserLogBase: React.FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [selectedDate, setSelectedDte] = useState(dayjs().local());

    useEffect(() => {
        userLogsModel.setCriteria({ created: selectedDate.format() });
    }, []);

    const renderEntries = () => {
        return userLogsModel.entries.map(entry => <UserLogEntry key={ entry.id } entry={ entry } />);
    }

    return (
        <UserLogContainer>
            <UserLogHeader>
                <span>{ selectedDate.format('MMM DD, YYYY') }</span>
                <Link to='/'>close</Link>
            </UserLogHeader>
            <UserLogEntries>
                { renderEntries() }
            </UserLogEntries>
        </UserLogContainer>
    )
};

export const UserLog = observer(UserLogBase);