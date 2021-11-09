import React from 'react';

import { NavContainer } from './styles';

interface IProps {
    className?: string;
}

export const Nav: React.FC<IProps> = ({ children, className = '' }) => {
    return (
        <NavContainer className={ className }>
            { children }
        </NavContainer>
    );
}
