import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { UserLogsModel } from '../../models/userLogs';

export const UserLogsCountBase: React.FC = () => {
    const userLogsModel = useRef(new UserLogsModel()).current;

    const onUserLogUpdate = () => userLogsModel.getEntries(true);

    useEffect(() => {
        window.addEventListener('userlog-update', onUserLogUpdate);

        userLogsModel.setCriteria({ created: dayjs() });

        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, []);

    return (
        <div>
            user log entries: { userLogsModel.count }
        </div>
    )
}

export const UserLogsCount = observer(UserLogsCountBase);