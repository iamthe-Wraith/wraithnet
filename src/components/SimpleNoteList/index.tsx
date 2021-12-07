import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { PopoverPosition } from 'react-tiny-popover';
import { NoteModel } from '../../models/notes';
import { SimpleNoteItem } from './SimpleNoteItem';

import { SimpleNoteListContainer } from './styles';

interface IProps {
  className?: string;
  notes: NoteModel[];
  popoverPlacement?: Exclude<PopoverPosition, 'custom'>[],
}

const SimpleNoteListBase: FC<IProps> = ({
  className = '',
  notes = [],
  popoverPlacement = ['right', 'bottom', 'top'],
}) => {
  const renderList = () => {
    const _notes = notes.map(note => (
      <SimpleNoteItem
        key={ note.id }
        note={ note }
        popoverPlacement={ popoverPlacement }
      />
    ));
    return (
      <div className='list-container'>
        { _notes }
      </div>
    );
  };

  return (
    <SimpleNoteListContainer className={ className }>
      { renderList() }
    </SimpleNoteListContainer>
  );
};

export const SimpleNoteList = observer(SimpleNoteListBase);
