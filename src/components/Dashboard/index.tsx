import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimeContext } from '../../contexts/Time';
import { UserContext } from '../../contexts/User';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { DashboardNav } from '../DashboardNav';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainRouter } from '../MainRouter';
import { Time } from '../Time';
import { UserLogsCount } from '../UserLogsCount';
import { Container, DateContainer, LeftCol, MainCol, MainContainer, RightCol, UserId } from './styles';

export const DashboardBase: React.FC = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const time = useContext(TimeContext);

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
                <DateContainer>{ time.now.format('MMM DD, YYYY') }</DateContainer>
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
                    <MainRouter />
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