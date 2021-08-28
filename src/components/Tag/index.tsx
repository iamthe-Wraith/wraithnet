import React from 'react';

import { TagContainer } from './styles';

interface IProps {
    allowHoverHighlight?: boolean;
    className?: string;
    isHighlighted?: boolean;
    text: string;
}

export const Tag: React.FC<IProps> = ({
    allowHoverHighlight = false,
    className = '',
    isHighlighted = false,
    text
}) => {
    return (
        <TagContainer className={ `${allowHoverHighlight && 'withHover'} ${isHighlighted && 'highlight'} ${className}` }>
            { text }
        </TagContainer>
    )
};