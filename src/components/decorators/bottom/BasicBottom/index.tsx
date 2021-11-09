import React from 'react';
import { BasicBottomContainer } from './styles';

interface IProps {
    className?: string;
}

export const BasicBottom: React.FC<IProps> = ({ className = '' }) => {
    return (
        <BasicBottomContainer className={ className }>
            <div className='bottom bottom-1' />
            <div className='bottom bottom-2' />
        </BasicBottomContainer>
    )
}