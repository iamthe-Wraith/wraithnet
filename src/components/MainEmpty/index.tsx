import React from 'react';
import { Dots } from '../Dots';
import { MainEmptyContainer } from './styles';

export const MainEmpty: React.FC = () => {
    return (
        <MainEmptyContainer className='dots'>
            <Dots height='150px' />
        </MainEmptyContainer>
    );
};
