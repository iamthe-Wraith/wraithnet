import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDLocationssBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const onCreateNewLocationClick = async (name: string) => {
        try {
            return await dnd.campaign.createLocation(name);
        } catch (err) {
            console.log('error creating location');
            console.log(err);
        }
    }

    return (
        <CollectionNoteEditor
            busy={ dnd.campaign.busy }
            className={ className }
            collection={ dnd.campaign.locations }
            onCreateNewClick={ onCreateNewLocationClick }
            type='Location'
        />
    );
};

export const DnDLocations = observer(DnDLocationssBase);
