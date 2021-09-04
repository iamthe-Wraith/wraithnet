import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { UserLogsCount } from '../UserLogsCount';
import { Container, LeftCol, MainCol, MainContainer } from './styles';

export const DashboardBase: React.FC = () => {
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
            <Header />
            <MainContainer>
                <LeftCol>
                    <UserLogsCount />
                </LeftCol>
                <MainCol>
                    <Main />
                </MainCol>
            </MainContainer>
            <Footer />
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);