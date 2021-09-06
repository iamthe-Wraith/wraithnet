import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { withTheme } from 'styled-components';
import { UserLogsModel } from '../../models/userLogs';
import { IThemeProps } from '../../styles/themes';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';

import { Count, Label, UserLogsCountContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
}

export const UserLogsCountBase: React.FC<IProps> = ({ className = '', theme }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;

    const onUserLogUpdate = () => userLogsModel.getEntries(true);

    useEffect(() => {
        window.addEventListener('userlog-update', onUserLogUpdate);

        userLogsModel.setCriteria({ created: dayjs().local().format() });

        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, []);

    return (
        <UserLogsCountContainer className={ className }>
            <AngleCorner
                backgroundColor='transparent'
                borderColor={ theme.primaryDark }
                className='angle-corner'
                config={[{ size: AngleSize.Tiny, position: AnglePos.TopRight }]}
            >
                <Label>user log entries:</Label>
                <Count>
                    { userLogsModel.count }
                </Count>
            </AngleCorner>
        </UserLogsCountContainer>
    )
}

const UserLogsCountAsObserver = observer(UserLogsCountBase);
export const UserLogsCount = withTheme(UserLogsCountAsObserver);