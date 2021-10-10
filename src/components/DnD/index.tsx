import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { DnDIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/dnd';

import { DnDContainer } from './styles';

export const DnDBase: React.FC = () => {
    const user = useContext(UserContext);

    useEffect(() => {
        IpcRenderer
            .init();
    }, []);

    if (!user.username) {
        return (
            <DnDContainer>
                <span>Loading...</span>
            </DnDContainer>
        );
    }

    return (
        <DnDContainer>
            dnd window...
        </DnDContainer>
    )
};

export const DnD = observer(DnDBase);