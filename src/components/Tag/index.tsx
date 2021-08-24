import React from 'react';

import { TagContainer } from './styles';

interface IProps {
    className?: string;
    text: string;
}

export const Tag: React.FC<IProps> = ({
    className = '',
    text
}) => {
    return (
        <TagContainer className={ className }>
            { text }
        </TagContainer>
    )
};