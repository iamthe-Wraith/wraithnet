import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { Button, ButtonType } from '../Button';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { Nav } from '../Nav';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';
import { LogIcon } from '../svgs/icons/LogIcon';
import { LogoutIcon } from '../svgs/icons/LogoutIcon';

export const DashboardNav: React.FC = () => {
    const location = useLocation();
    const onOpenDnDClick = () => DashboardIpcRenderer.open('dnd');

    return (
        <Nav>
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
        </Nav>
    )
}