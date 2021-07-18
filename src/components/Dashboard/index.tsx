import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/User';

import { Container } from './styles';

interface IProps {}

export const DashboardBase: React.FC<IProps> = () => {
    const user = useContext(UserContext);
    return (
        <Container>
            Dashboard - { user?.username }
        </Container>
    )
};

export const Dashboard = observer(DashboardBase);