import React from 'react';

import { DnDNPCsContainer } from './styles';

interface IProps {
    className?: string;
}

export const DnDNPCs: React.FC<IProps> = ({ className = '' }) => {
    return (
        <DnDNPCsContainer className={ className }>
            DnDNPCs
        </DnDNPCsContainer>
    );
}
