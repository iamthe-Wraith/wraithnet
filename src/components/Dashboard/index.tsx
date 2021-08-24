import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Header } from '../Header';
import { Main } from '../Main';
import { UserLogsCount } from '../UserLogsCount';

import { Container } from './styles';

interface IProps {}

export const DashboardBase: React.FC<IProps> = () => {
    const history = useHistory();

    const onOpen = (e: CustomEventInit<string>) => {
        switch (e.detail) {
            case 'userlog':
                history.push('/user-log');
                break;
            default:
                console.error(`invalid open command argument: ${e.detail}`);
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('open-command', onOpen);
    }, []);

    return (
        <Container>
            <Header className='header' />
            <Main className='main' />
            <UserLogsCount className='footer' />
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);