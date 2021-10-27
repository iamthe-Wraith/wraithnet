import React from 'react';

import { DnDSessionsContainer } from './styles';

interface IProps {
    className?: string;
}

export const DnDSessions: React.FC<IProps> = ({ className = '' }) => {
    return (
        <DnDSessionsContainer className={ className }>
            sessions
        </DnDSessionsContainer>
    );
}
