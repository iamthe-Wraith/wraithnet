import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { Nav } from '../Nav';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';
import { PeopleIcon } from '../svgs/icons/PeopleIcon';

export const DnDNav: React.FC = () => {
    const location = useLocation();

    return (
        <Nav>
            <Link to='/' className={`icon-link ${location.pathname === '/' ? 'selected' : ''}`}>
            <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <CrossedSwordsIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/npcs' className={`icon-link ${location.pathname === '/npcs' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <PeopleIcon className='icon' />
                </Hex>
            </Link>
        </Nav>
    )
}