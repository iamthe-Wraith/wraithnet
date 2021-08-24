import { observer } from 'mobx-react';
import React from 'react';
import { Header } from '../Header';
import { Main } from '../Main';
import { UserLogsCount } from '../UserLogsCount';

import { Container } from './styles';

interface IProps {}

export const DashboardBase: React.FC<IProps> = () => {
    return (
        <Container>
            <Header className='header' />
            <Main className='main' />
            <UserLogsCount className='footer' />
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);