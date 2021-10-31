import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDMiscCampaignNotesBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const onCreateNewMiscNoteClick = async (name: string) => {
        try {
            return await dnd.campaign.createMiscNote(name);
        } catch (err) {
            console.log('error creating misc note');
            console.log(err);
        }
    }

    return (
        <CollectionNoteEditor
            busy={ dnd.campaign.busy }
            className={ className }
            collection={ dnd.campaign.misc }
            onCreateNewClick={ onCreateNewMiscNoteClick }
            type='Misc'
        />
    );
};

export const DnDMiscCampaignNotes = observer(DnDMiscCampaignNotesBase);
