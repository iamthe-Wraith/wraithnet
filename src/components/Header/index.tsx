import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { LogIcon } from '../icons/LogIcon';
import { Center, Container, Side, UserId, Username } from './styles';

interface IProps {
    className?: string;
}

export const HeaderBase: React.FC<IProps> = ({ className = '' }) => {
    const user = useContext(UserContext);

    return (
        <Container className={ className }>
            <Side className='left'>
                <div />
                <div>
                    <UserId>{ user?.id }</UserId>
                </div>
            </Side>
            <Center>
                <Username>{ user?.username }</Username>
            </Center>
            <Side className='right'>
                <div />
                <div>
                    <Link to='/user-log' className='icon-link'>
                        <LogIcon />
                    </Link>
                </div>
            </Side>
        </Container>
    )
};

export const Header = observer(HeaderBase);