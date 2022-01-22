import React from 'react';
import { Dots } from '../Dots';
import { MainEmptyContainer } from './styles';

export const MainHome: React.FC = () => {    
    return (
        <MainEmptyContainer>
            <div />
            <Dots height='150px' />
        </MainEmptyContainer>
    );
};
