import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { Nav } from '../Nav';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';
import { LogIcon } from '../svgs/icons/LogIcon';
import { MapIcon } from '../svgs/icons/MapIcon';
import { PeopleIcon } from '../svgs/icons/PeopleIcon';
import { QuestionMarkIcon } from '../svgs/icons/QuestionMarkIcon';

export const DnDNav: React.FC = () => {
    const location = useLocation();

    return (
        <Nav>
            <Link to='/' className={`icon-link ${location.pathname === '/' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <CrossedSwordsIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/sessions' className={`icon-link ${location.pathname === '/sessions' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <LogIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/npcs' className={`icon-link ${location.pathname === '/npcs' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <PeopleIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/locations' className={`icon-link ${location.pathname === '/locations' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <MapIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/quests' className={`icon-link ${location.pathname === '/quests' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <QuestionMarkIcon className='icon' />
                </Hex>
            </Link>
        </Nav>
    )
}