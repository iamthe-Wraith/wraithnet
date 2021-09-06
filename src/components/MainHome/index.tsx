import React from 'react';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
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
