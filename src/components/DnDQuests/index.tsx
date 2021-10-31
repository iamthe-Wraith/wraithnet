import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDQuestsBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const onCreateNewQuestClick = async (name: string) => {
        try {
            return await dnd.campaign.createQuest(name);
        } catch (err) {
            console.log('error creating quest');
            console.log(err);
        }
    }

    return (
        <CollectionNoteEditor
            busy={ dnd.campaign.busy }
            className={ className }
            collection={ dnd.campaign.quests }
            onCreateNewClick={ onCreateNewQuestClick }
            type='Quest'
        />
    );
};

export const DnDQuests = observer(DnDQuestsBase);
