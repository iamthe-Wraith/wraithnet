import React from 'react';

import { Left2Container } from './styles';

interface IProps {
    className?: string;
}

export const Left2: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Left2Container className={ className }>
            <div className='trapezoid upper' />
            <div className='center outer' />
            <div className='center inner' />
            <div className='trapezoid lower' />
        </Left2Container>
    );
}
