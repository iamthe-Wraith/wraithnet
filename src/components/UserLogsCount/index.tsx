import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { UserLogsModel } from '../../models/userLogs';

import { UserLogsCountContainer } from './styles';

interface IProps {
    className?: string;
}

export const UserLogsCountBase: React.FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;

    const onUserLogUpdate = () => userLogsModel.getEntries(true);

    useEffect(() => {
        window.addEventListener('userlog-update', onUserLogUpdate);

        userLogsModel.setCriteria({ created: dayjs().local().format() });

        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, []);

    return (
        <UserLogsCountContainer className={ className }>
            user log entries: { userLogsModel.count }
        </UserLogsCountContainer>
    )
}

export const UserLogsCount = observer(UserLogsCountBase);