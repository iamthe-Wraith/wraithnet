import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { LogIcon } from '../icons/LogIcon';
import { Container } from './styles';

interface IProps {
    className?: string;
}

export const HeaderBase: React.FC<IProps> = ({ className = '' }) => {
    const user = useContext(UserContext);

    return (
        <Container className={ className }>
            <div>{ user?.username }</div>
            <Link to='/user-log'>
                <LogIcon />
            </Link>
        </Container>
    )
};

export const Header = observer(HeaderBase);