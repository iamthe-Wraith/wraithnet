import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { DnDItems } from '../DnDItems';
import { DnDLocations } from '../DnDLocations';
import { DnDMainHome } from '../DnDMainHome';
import { DnDMiscCampaignNotes } from '../DnDMiscCampaignNotes';
import { DnDNPCs } from '../DnDNPCs';
import { DnDQuests } from '../DnDQuests';
import { DnDSessions } from '../DnDSessions';
import { Theme } from '../Theme';

export const DnDCampaignRouter: React.FC = () => (
    <ThemeStore>
        <Theme>
            <Routes>
                <Route path='/' element={ <DnDMainHome /> } />
                <Route path='/sessions' element={ <DnDSessions /> } />
                <Route path='/npcs' element={ <DnDNPCs /> } />
                <Route path='/locations' element={ <DnDLocations /> } />
                <Route path='/quests' element={ <DnDQuests /> } />
                <Route path='/items' element={ <DnDItems /> } />
                <Route path='/misc' element={ <DnDMiscCampaignNotes /> } />
            </Routes>
        </Theme>
    </ThemeStore>
);