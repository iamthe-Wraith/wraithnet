import React, { KeyboardEvent, useEffect, useRef } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkInlineLinks from 'remark-inline-links';
import { Markdown } from '../Markdown';
import { TextArea } from '../TextArea';

import { BaseNoteEditorContainer } from './styles';
import { ParagraphComponent } from '../NoteEditor/components/ParagraphComponent';
import { HeadingsComponent } from '../NoteEditor/components/HeadingsComponent';
import { RefComponent } from '../NoteEditor/components/RefComponent';
import { AnchorComponent } from '../NoteEditor/components/AnchorComponent';

export type ICustomComponents = { [key: string]: React.FC<any> };

interface IProps {
    className?: string;
    content?: string;
    customComponents?: ICustomComponents
    editMode?: boolean;
    id: string;
    onChange(content: string): void;
    onSave?(): void;
    noteRef?(ref: HTMLTextAreaElement): void;
}


export const defaultCustomComponents: ICustomComponents = {
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

export const BaseNoteEditor: React.FC<IProps> = ({
    className = '',
    content = '',
    customComponents = defaultCustomComponents,
    editMode,
    id,
    onChange,
    onSave,
    noteRef,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editMode && !!noteRef) {
            const textarea = document.querySelector(`#${id}`);
            textareaRef.current = textarea as HTMLTextAreaElement;
            noteRef?.(textareaRef.current);
        }
    }, [editMode]);

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            onSave?.();
        }
    };

    return (
        <BaseNoteEditorContainer className={ className }>
            {
                editMode
                    ? (
                        <TextArea
                            className='editor-textarea'
                            textareaId={ id }
                            textareaRef={ ref => textareaRef.current = ref }
                            onKeyDown={ onKeyDown }
                            onChange={ e => onChange(e.target.value) }
                            value={ content }
                        />
                    )
                    : (
                        <Markdown
                            content={ content }
                            rehypePlugins={ [rehypeRaw] }
                            remarkPlugins={ [remarkGfm, remarkInlineLinks] }
                            components={ customComponents }
                        />
                    )
            }
        </BaseNoteEditorContainer>
    );
};
