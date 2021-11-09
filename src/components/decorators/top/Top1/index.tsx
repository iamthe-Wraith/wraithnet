import React from 'react';
import { BasicTop } from '../BasicTop';

import { Top1Container } from './styles'

interface IProps {
    className?: string;
}

export const Top1: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Top1Container className={ className }>
            <div className='top-center' />
            <BasicTop />
        </Top1Container>
    );
}
