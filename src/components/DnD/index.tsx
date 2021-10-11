import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { UserContext } from '../../contexts/User';
import { DnDIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/dnd';
import { Campaign } from '../Campaign';
import { CampaignsList } from '../CampaignsList';
import { LoadingSpinner } from '../LoadingSpinner';

import { DnDContainer } from './styles';

export const DnDBase: React.FC = () => {
    const user = useContext(UserContext);
    const campaigns = useContext(DnDContext);

    useEffect(() => {
        IpcRenderer.init();

        campaigns.getCampaigns()
            .then(() => {
                // TODO: this is only for development purposes...needs to be removed...
                campaigns.forceSelect();
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    if (!user.username) {
        return (
            <DnDContainer>
                <LoadingSpinner className='loading' />
            </DnDContainer>
        );
    }

    const renderContent = () => {
        if (!campaigns.campaign) {
            return <CampaignsList className='campaigns-list' />;
        }

        return <Campaign />
    }

    return (
        <DnDContainer>
            { renderContent() }
        </DnDContainer>
    )
};

export const DnD = observer(DnDBase);