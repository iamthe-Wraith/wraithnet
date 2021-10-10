import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { CampaignsContext } from '../../contexts/Campaigns';
import { UserContext } from '../../contexts/User';
import { DnDIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/dnd';
import { AbsoluteCenter } from '../../styles/styles';
import { CampaignsList } from '../CampaignsList';
import { LoadingSpinner } from '../LoadingSpinner';

import { DnDContainer } from './styles';

export const DnDBase: React.FC = () => {
    const user = useContext(UserContext);
    const campaigns = useContext(CampaignsContext);

    useEffect(() => {
        IpcRenderer.init();

        campaigns.getCampaigns()
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

        return (
            <div>
                the selected campaign...{ campaigns.campaign.name }
            </div>
        )
    }

    return (
        <DnDContainer>
            { renderContent() }
        </DnDContainer>
    )
};

export const DnD = observer(DnDBase);