import React from 'react';
import { BasicBottom } from '../BasicBottom';

import { Bottom1Container } from './styles'

interface IProps {
    className?: string;
}

export const Bottom1: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Bottom1Container className={ className }>
            <BasicBottom />
            <div className='bottom-center' />
        </Bottom1Container>
    );
}
