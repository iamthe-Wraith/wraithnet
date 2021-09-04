import React from 'react';

import { Container } from './styles';

interface IProps {
    className?: string;
}

export const Main: React.FC<IProps> = ({ className = '' }) => {
    return (
        <Container id='main' className={ className } />
    );
};