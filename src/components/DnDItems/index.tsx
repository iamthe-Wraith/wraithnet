import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDItemsBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const onCreateNewItemClick = async (name: string) => {
        try {
            return await dnd.campaign.createItem(name);
        } catch (err) {
            console.log('error creating item');
            console.log(err);
        }
    }

    return (
        <CollectionNoteEditor
            busy={ dnd.campaign.busy }
            className={ className }
            collection={ dnd.campaign.items }
            onCreateNewClick={ onCreateNewItemClick }
            type='Item'
        />
    );
};

export const DnDItems = observer(DnDItemsBase);
