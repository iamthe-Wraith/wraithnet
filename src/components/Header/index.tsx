import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { LogIcon } from '../svgs/icons/LogIcon';
import { XIcon } from '../svgs/icons/XIcon';
import { LogoutIcon } from '../svgs/icons/LogoutIcon';
import { Center, DateContainer, HeaderContainer, Side, UserId, Username } from './styles';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';

interface IProps extends IThemeProps {
    className?: string;
}

const HeaderBase: React.FC<IProps> = ({ className = '' }) => {
    const user = useContext(UserContext);
    const location = useLocation();
    const [currentDate, setCurrentDate] = useState(dayjs().local().format('MMM DD, YYYY'))

    // TODO - setTimeout to change date

    const onOpenDnDClick = () => DashboardIpcRenderer.open('dnd');

    return (
        <HeaderContainer className={ className }>
            <Button
                buttonType={ ButtonType.Blank }
                className='close'
                onClick={ DashboardIpcRenderer.close }
            >
                <XIcon />
            </Button>
            <Side className='left'>
                <div />
                <div>
                    <UserId>{ user?.id }</UserId>
                    <DateContainer>{ currentDate }</DateContainer>
                </div>
            </Side>
            <Center>
                <Username>{ user?.username }</Username>
            </Center>
            <Side className='right'>
                <div />
                <div>
                    <Link to='/' className={`icon-link ${location.pathname === '/' ? 'selected' : ''}`}>
                        <Hex size={ HexSize.Tiny } color={ 'none' }>
                            <span className='icon'>W</span>
                        </Hex>
                    </Link>
                    <Link to='/user-log' className={`icon-link ${location.pathname === '/user-log' ? 'selected' : ''}`}>
                        <Hex size={ HexSize.Tiny } color={ 'none' }>
                            <LogIcon className='icon' />
                        </Hex>
                    </Link>
                    <Button
                        buttonType={ ButtonType.Blank }
                        className='icon-link'
                        onClick={ onOpenDnDClick }
                    >
                        <Hex size={ HexSize.Tiny } color={ 'none' }>
                            <CrossedSwordsIcon className='icon' />
                        </Hex>
                    </Button>
                    <Button
                        buttonType={ ButtonType.Blank }
                        className='icon-link'
                        onClick={ DashboardIpcRenderer.logout }
                    >
                        <Hex size={ HexSize.Tiny } color={ 'none' }>
                            <LogoutIcon className='icon' />
                        </Hex>
                    </Button>
                </div>
            </Side>
        </HeaderContainer>
    )
};

export const Header = observer(HeaderBase);