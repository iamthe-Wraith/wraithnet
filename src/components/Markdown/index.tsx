import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { PluggableList } from 'react-markdown/lib/react-markdown';
import { AnchorComponent } from '../NoteEditor/components/AnchorComponent';
import { HeadingsComponent } from '../NoteEditor/components/HeadingsComponent';
import { ParagraphComponent } from '../NoteEditor/components/ParagraphComponent';
import { RefComponent } from '../NoteEditor/components/RefComponent';

import { MarkdownContainer } from './styles';

interface IProps {
    className?: string;
    content: string;
    rehypePlugins: PluggableList;
    remarkPlugins: PluggableList;
    components?: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
}

const defaultCustomComponents: any = {
    a: AnchorComponent,
    p: ParagraphComponent,
    h1: HeadingsComponent,
    h2: HeadingsComponent,
    h3: HeadingsComponent,
    h4: HeadingsComponent,
    h5: HeadingsComponent,
    h6: HeadingsComponent,
    ref: RefComponent,
};

export const Markdown: React.FC<IProps> = ({
    className = '',
    content,
    rehypePlugins = [],
    remarkPlugins = [],
    components = {},
}) => {
    const customComponents = useRef({ ...defaultCustomComponents, ...components }).current;
    return (
        <MarkdownContainer className={ className }>
            <ReactMarkdown
                children={ content }
                rehypePlugins={ rehypePlugins }
                remarkPlugins={ remarkPlugins }
                components={ customComponents }
            />
        </MarkdownContainer>
    );
};
