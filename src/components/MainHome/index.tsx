import React from 'react';
import { Hex } from '../containers/Hex';
import { Dots } from '../Dots';
import { LogIcon } from '../icons/LogIcon';
import { MainEmptyContainer } from './styles';

export const MainHome: React.FC = () => {
    return (
        <MainEmptyContainer>
            <div />
            <Dots height='150px' />
        </MainEmptyContainer>
    );
};
