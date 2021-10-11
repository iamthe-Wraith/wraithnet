import React from 'react';

import { Right1Container } from './styles';

interface IProps {
    className?: string;
}

export const Right1: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Right1Container className={ className }>
            <div className='side right outer upper' />
            <div className='side right inner upper' />
            <div className='side right outer lower' />
            <div className='side right inner lower' />
        </Right1Container>
    );
}
