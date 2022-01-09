import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { CollectionNoteEditor } from '../CollectionNoteEditor';

interface IProps {
    className?: string;
}

const DnDItemsBase: React.FC<IProps> = ({ className = '' }) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const dnd = useContext(DnDContext);

    const onCreateNewItemClick = async (name: string) => {
        try {
            return await dnd.campaign.createItem(name);
        } catch (err: any) {
            errorMessages.push({
                message: err.message,
                title: 'Create Item Error',
            });
        }
    };

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
