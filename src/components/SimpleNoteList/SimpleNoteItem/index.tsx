import React, { useEffect, useState } from 'react';
import { PopoverPosition } from 'react-tiny-popover';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links';
import { NoteModel } from '../../../models/notes';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../../LoadingSpinner';
import { Markdown } from '../../Markdown';
import { HeadingsComponent } from '../../NoteEditor/components/HeadingsComponent';
import { ParagraphComponent } from '../../NoteEditor/components/ParagraphComponent';
import { Tag, TagType } from '../../Tag';
import { PopoverType, TinyPopover } from '../../TinyPopover';

import { AnchorContainer, ContentContainer, SimpleNoteItemContainer } from './styles';

interface IProps {
    className?: string;
    note: NoteModel;
    popoverPlacement?: Exclude<PopoverPosition, 'custom'>[],
}

const customComponents: any = {
    p: ParagraphComponent,
    h1: HeadingsComponent,
    h2: HeadingsComponent,
    h3: HeadingsComponent,
    h4: HeadingsComponent,
    h5: HeadingsComponent,
    h6: HeadingsComponent,
    ref: 'ref', // do not reference other notes inside an already referenced note
}

export const SimpleNoteItem: React.FC<IProps> = ({
    className = '',
    note,
    popoverPlacement = ['right', 'bottom', 'top'],
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && !note.loaded) {
            note.load()
                .catch(err => {
                    console.log('error loading note');
                    console.log(err);
                    setIsOpen(false);
                });
        }
    }, [isOpen]);

    const renderAnchor = () => {
        console.log('note.tags', note.tags.map(tag => ({...tag})));

        const tags = note.tags.map(tag =>(
            <Tag
                key={ tag.id }
                allowHoverHighlight={ false }
                className='item-tag'
                isHighlighted={ false }
                text={ tag.text }
                type={ TagType.Primary }
            />
        ));

        return (
            <AnchorContainer onClick={() => setIsOpen(!isOpen)}>
                { note.name }
                <div className='tags-container'>{ tags }</div>
            </AnchorContainer>
        )
    };

    const renderContent = () => {
        let content: JSX.Element;

        if (note.busy) {
            content = (
                <LoadingSpinner
                    className='spinner'
                    size={ SpinnerSize.Medium }
                    type={ SpinnerType.Random }
                />
            )
        } else {
            content = (
                <Markdown
                    content={ note.text ?? '' }
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm, remarkInlineLinks]}
                    components={customComponents}
                />
            )
        }

        return (
            <ContentContainer className='markdown-container'>
                { content }
            </ContentContainer>
        )
    }

    return (
        <TinyPopover
            dismissOnOutsideAction
            anchor={ renderAnchor() }
            anchorClassName='simple-note-item'
            isOpen={ isOpen }
            onRequestClose={() => setIsOpen(false)}
            placement={ popoverPlacement }
            type={ PopoverType.primaryDark }
        >
            { renderContent() }
        </TinyPopover>
    );
}
