import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dots } from '../Dots';
import { MainEmptyContainer } from './styles';

export const MainHome: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        console.log('path: ', location.pathname);
    }, [location.pathname]);
    
    return (
        <MainEmptyContainer>
            <div />
            <Dots height='150px' />
        </MainEmptyContainer>
    );
};
