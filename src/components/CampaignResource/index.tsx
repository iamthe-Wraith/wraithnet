import React from 'react';
import { useParams } from 'react-router-dom';
import { DnDItems } from '../DnDItems';
import { DnDLocations } from '../DnDLocations';
import { DnDMainHome } from '../DnDMainHome';
import { DnDMiscCampaignNotes } from '../DnDMiscCampaignNotes';
import { DnDNPCs } from '../DnDNPCs';
import { DnDQuests } from '../DnDQuests';
import { DnDSessions } from '../DnDSessions';

export const CampaignResource: React.FC = () => {
    const { resource } = useParams();

    switch (resource) {
        case 'sessions': return <DnDSessions />;
        case 'npcs': return <DnDNPCs />;
        case 'locations': return <DnDLocations />;
        case 'quests': return <DnDQuests />;
        case 'items': return <DnDItems />;
        case 'misc': return <DnDMiscCampaignNotes />;
        default: return <DnDMainHome />;
    }
};
