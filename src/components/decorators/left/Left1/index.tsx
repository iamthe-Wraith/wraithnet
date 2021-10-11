import React from 'react';

import { Left1Container } from './styles';

interface IProps {
    className?: string;
}

export const Left1: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Left1Container className={ className }>
            <div className='side left outer upper' />
            <div className='side left inner upper' />
            <div className='side left outer lower' />
            <div className='side left inner lower' />
        </Left1Container>
    );
}
