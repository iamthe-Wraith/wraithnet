import React, { useCallback, useEffect, useRef, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkInlineLinks from 'remark-inline-links';
import { PopoverType, TinyPopover } from '../../../TinyPopover';
import { HeadingsComponent } from '../HeadingsComponent';
import { IComponentProps } from '../types';
import { observer } from 'mobx-react-lite';
import { NoteModel } from '../../../../models/notes';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../../../LoadingSpinner';
import { RefComponentAnchor, RefComponentContent } from './styles';
import { Markdown } from '../../../Markdown';
import { ParagraphComponent } from '../ParagraphComponent';

interface IRefComponentProps extends IComponentProps {
    path: string;
};

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

const getNoteProps = (path = '') => {
    const [category, slug] = path.split('/');

    return { category, slug };
}

const RefComponentBase: React.FC<IRefComponentProps> = ({ children, path }) => {
    const [isOpen, setIsOpen] = useState(false);
    const note = useRef(new NoteModel(getNoteProps(path))).current;

    useEffect(() => {
        if (isOpen && !note.loaded && !!path) {
            note.load()
                .catch(err => {
                    console.log('error loading note');
                    console.log(err);
                    setIsOpen(false);
                });
        }
    }, [isOpen]);

    const renderAnchor = useCallback(() => {
        return (
            <RefComponentAnchor
                className={ `ref-anchor ${ !path ? 'error' : '' }` }
                onClick={() => setIsOpen(!isOpen)}
            >
                { children?.[0] }
            </RefComponentAnchor>
        )
    }, [children]);

    const renderContent = () => {
        let content: JSX.Element;

        if (!path) {
            content = (
                <span>No path found</span>
            )
        } else if (note.busy) {
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
            <RefComponentContent className='markdown-container'>
                { content }
            </RefComponentContent>
        )
    }

    return (
        <TinyPopover
            dismissOnOutsideAction
            anchor={ renderAnchor() }
            isOpen={ isOpen }
            onRequestClose={() => setIsOpen(false)}
            type={ PopoverType.primaryDark }
        >
            { renderContent() }
        </TinyPopover>
    )
};

export const RefComponent = observer(RefComponentBase);