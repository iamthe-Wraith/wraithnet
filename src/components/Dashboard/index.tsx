import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { UserLogsCount } from '../UserLogsCount';

import { Container } from './styles';

interface IProps {}

export const DashboardBase: React.FC<IProps> = () => {
    const user = useContext(UserContext);

    return (
        <Container>
            Dashboard - { user?.username }
            <UserLogsCount />
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);