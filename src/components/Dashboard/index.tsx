import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { Button, ButtonType } from '../Button';
import { LogIcon } from '../icons/LogIcon';
import { UserLogsCount } from '../UserLogsCount';

import { Container } from './styles';

interface IProps {}

export const DashboardBase: React.FC<IProps> = () => {
    const user = useContext(UserContext);

    const onLogClick = () => {
        console.log('clicked');
    }

    return (
        <Container>
            Dashboard - { user?.username }
            <UserLogsCount />
            <Button onClick={ onLogClick } type={ ButtonType.Blank }>
                <LogIcon />
            </Button>
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);