import React from 'react';

import { TagContainer } from './styles';

interface IProps {
    allowHoverHighlight?: boolean;
    className?: string;
    isHighlighted?: boolean;
    text: string;
    type?: TagType;
}

export enum TagType {
    Light = 'light',
    Primary = 'primary',
    Secondary = 'secondary',
}

export const Tag: React.FC<IProps> = ({
    allowHoverHighlight = false,
    className = '',
    isHighlighted = false,
    text,
    type = TagType.Primary,
}) => {
    return (
        <TagContainer className={ `${type} ${allowHoverHighlight && 'withHover'} ${isHighlighted && 'highlight'} ${className}` }>
            { text }
        </TagContainer>
    )
};