import React from 'react';
import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { PluggableList } from 'react-markdown/lib/react-markdown';

import { MarkdownContainer } from './styles';

interface IProps {
    className?: string;
    content: string;
    rehypePlugins: PluggableList;
    remarkPlugins: PluggableList;
    components: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
}

export const Markdown: React.FC<IProps> = ({
    className = '',
    content,
    rehypePlugins = [],
    remarkPlugins = [],
    components = {},
}) => {
    return (
        <MarkdownContainer className={ className }>
            <ReactMarkdown
                children={ content }
                rehypePlugins={rehypePlugins}
                remarkPlugins={remarkPlugins}
                components={components}
            />
        </MarkdownContainer>
    );
}
