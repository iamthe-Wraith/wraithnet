import React from 'react';

import { Right2Container } from './styles';

interface IProps {
    className?: string;
}

export const Right2: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Right2Container className={ className }>
            <div className='trapezoid upper' />
            <div className='center outer' />
            <div className='center inner' />
            <div className='trapezoid lower' />
        </Right2Container>
    );
};
