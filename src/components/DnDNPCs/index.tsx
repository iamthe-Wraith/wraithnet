import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
  className?: string;
}

const DnDNPCsBase: React.FC<IProps> = ({ className = '' }) => {
  const dnd = useContext(DnDContext);

  const onCreateNewNpcClick = async (name: string) => {
    try {
      return await dnd.campaign.createNPC(name);
    } catch (err) {
      console.log('error creating npc');
      console.log(err);
    }
  };

  return (
    <CollectionNoteEditor
      busy={ dnd.campaign.busy }
      className={ className }
      collection={ dnd.campaign.npcs }
      onCreateNewClick={ onCreateNewNpcClick }
      type='NPC'
    />
  );
};

export const DnDNPCs = observer(DnDNPCsBase);
