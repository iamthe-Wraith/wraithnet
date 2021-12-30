import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import { AnchorComponent } from '../AnchorComponent';
import { ErrorMessagesContext } from '../../../../contexts/ErrorMessages';

interface IRefComponentProps extends IComponentProps {
  path: string;
}

const customComponents: any = {
  a: AnchorComponent,
  p: ParagraphComponent,
  h1: HeadingsComponent,
  h2: HeadingsComponent,
  h3: HeadingsComponent,
  h4: HeadingsComponent,
  h5: HeadingsComponent,
  h6: HeadingsComponent,
  ref: 'ref', // do not reference other notes inside an already referenced note
};

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
          components={ customComponents }
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
    <TinyPopover
      dismissOnOutsideAction
      anchor={ renderAnchor() }
      isOpen={ isOpen }
      onRequestClose={ () => setIsOpen(false) }
      type={ PopoverType.primaryDark }
    >
      { renderContent() }
    </TinyPopover>
  );
};

export const RefComponent = observer(RefComponentBase);