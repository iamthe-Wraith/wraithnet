import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDSessionsBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const onCreateNewSessionClick = async (name: string) => {
        try {
            return await dnd.campaign.createSession(name);
        } catch (err) {
            console.log('error creating npc');
            console.log(err);
        }
    }

    return (
        <CollectionNoteEditor
            busy={ dnd.campaign.busy }
            className={ className }
            collection={ dnd.campaign.sessions }
            onCreateNewClick={ onCreateNewSessionClick }
            type='Session'
        />
    );
};

export const DnDSessions = observer(DnDSessionsBase);
