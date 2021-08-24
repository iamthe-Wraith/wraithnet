import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserLogsModel } from '../../models/userLogs';
import { UserLogEntry } from '../UserLogEntry';

import { UserLogContainer } from './styles';

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
            <div className='header'>
                <span>{ selectedDate.format('MMM DD, YYYY') }</span>
                <Link to='/'>close</Link>
            </div>
            <div>
                { renderEntries() }
            </div>
        </UserLogContainer>
    )
};

export const UserLog = observer(UserLogBase);