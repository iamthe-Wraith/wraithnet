import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { DashboardNav } from '../DashboardNav';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { Time } from '../Time';
import { UserLogsCount } from '../UserLogsCount';
import { Container, DateContainer, LeftCol, MainCol, MainContainer, RightCol, UserId } from './styles';

export const DashboardBase: React.FC = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [currentDate, setCurrentDate] = useState(dayjs().local().format('MMM DD, YYYY'));

    // TODO - setTimeout to change date

    const onOpen = (e: CustomEventInit<string>) => {
        switch (e.detail) {
            case 'userlog':
                navigate('/user-log');
                DashboardIpcRenderer.focus();
                break;
            default:
                console.error(`invalid open command argument: ${e.detail}`);
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('open-command', onOpen);
    }, []);

    const renderHeaderLeftContent = () => {
        return (
            <div className='header-left-content'>
                <UserId>{ user?.id }</UserId>
                <DateContainer>{ currentDate }</DateContainer>
            </div>
        );
    };

    return (
        <Container>
            <Header
                centerContent={ user?.username }
                leftContent={ renderHeaderLeftContent() }
                onClose={ DashboardIpcRenderer.close }
                rightContent={ <DashboardNav /> }
            />
            <MainContainer>
                <LeftCol>
                    <UserLogsCount />
                </LeftCol>
                <MainCol>
                    <Main />
                </MainCol>
                <RightCol>
                    <Time className='time' />
                </RightCol>
            </MainContainer>
            <Footer />
        </Container>
    );
};

export const Dashboard = observer(DashboardBase);