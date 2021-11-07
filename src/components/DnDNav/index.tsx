import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { Nav } from '../Nav';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';
import { HomeIcon } from '../svgs/icons/HomeIcon';
import { LogIcon } from '../svgs/icons/LogIcon';
import { MapIcon } from '../svgs/icons/MapIcon';
import { MinusIcon } from '../svgs/icons/MinusIcon';
import { PeopleIcon } from '../svgs/icons/PeopleIcon';
import { QuestionMarkIcon } from '../svgs/icons/QuestionMarkIcon';

export const DnDNav: React.FC = () => {
    const location = useLocation();

    return (
        <Nav>
            <Link to='/' className={`icon-link ${location.pathname === '/' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <HomeIcon className='icon' />
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
            <Link to='/items' className={`icon-link ${location.pathname === '/items' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <CrossedSwordsIcon className='icon' />
                </Hex>
            </Link>
            <Link to='/misc' className={`icon-link ${location.pathname === '/misc' ? 'selected' : ''}`}>
                <Hex size={ HexSize.Tiny } color={ 'none' }>
                    <MinusIcon className='icon with-stroke' />
                </Hex>
            </Link>
        </Nav>
    )
}