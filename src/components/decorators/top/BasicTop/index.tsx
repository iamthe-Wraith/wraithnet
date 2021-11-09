import React from 'react';
import { BasicTopContainer } from './styles';

interface IProps {
    className?: string;
}

export const BasicTop: React.FC<IProps> = ({ className = '' }) => {
    return (
        <BasicTopContainer className={ className }>
            <div className='top top-2' />
            <div className='top top-1' />
        </BasicTopContainer>
    )
}