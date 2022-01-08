import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkInlineLinks from 'remark-inline-links';
import { IComponentProps } from '../types';
import { observer } from 'mobx-react-lite';
import { NoteModel } from '../../../../models/notes';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../../../LoadingSpinner';
import { RefComponentAnchor, RefComponentContent } from './styles';
import { Markdown } from '../../../Markdown';
import { ErrorMessagesContext } from '../../../../contexts/ErrorMessages';
import { Modal } from '../../../Modal';

interface IRefComponentProps extends IComponentProps {
    path: string;
}

const getNoteProps = (path = '') => {
    const [category, slug] = path.split('/');

    return { category, slug };
};

const RefComponentBase: React.FC<IRefComponentProps> = ({ children, path }) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const [isOpen, setIsOpen] = useState(false);
    const note = useRef(new NoteModel(getNoteProps(path))).current;

    useEffect(() => {
        const invalidPath = validatePath();

        if (isOpen && !note.loaded && !invalidPath) {
            note.load()
                .catch(err => {
                    errorMessages.push({ message: err.message });
                    setIsOpen(false);
                });
        }
    }, [isOpen]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const renderAnchor = useCallback(() => {
        const invalidPath = validatePath();

        return (
            <RefComponentAnchor
                className={ `ref-anchor ${ invalidPath ? 'error' : '' }` }
                onClick={ () => setIsOpen(!isOpen) }
            >
                { children?.[0] }
            </RefComponentAnchor>
        );
    }, [children]);

    const validatePath = () => {
        if (!path) return 'No path found';

        const pathPieces = path.split('/').filter(p => !!p.trim());
        if (pathPieces.length !== 2) return 'Invalid path found';

        return false;
    };

    const renderContent = () => {
        let content: JSX.Element;
        const invalidPath = validatePath();

        if (!!invalidPath) {
            content = (
                <div className='invalid-path-msg'>{ invalidPath }</div>
            );
        } else if (note.busy) {
            content = (
                <LoadingSpinner
                    className='spinner'
                    size={ SpinnerSize.Medium }
                    type={ SpinnerType.Random }
                />
            );
        } else {
            content = (
                <Markdown
                    content={ note.text ?? '' }
                    rehypePlugins={ [rehypeRaw] }
                    remarkPlugins={ [remarkGfm, remarkInlineLinks] }
                />
            );
        }

        return (
            <RefComponentContent className={ `markdown-container ${!!invalidPath ? 'invalid-path' : ''}` }>
                { content }
            </RefComponentContent>
        );
    };

    return (
        <>
            { renderAnchor() }
            <Modal
                closeOnOverlayClick
                isOpen={ isOpen }
                header={ children?.[0] }
                onClose={ onClose }
            >
                { renderContent() }
            </Modal>
        </>
    );
};

export const RefComponent = observer(RefComponentBase);