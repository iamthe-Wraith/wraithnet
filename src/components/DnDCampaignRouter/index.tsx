import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
      <HashRouter>
        <Switch>
          <Route exact path='/' component={ DnDMainHome } />
          <Route exact path='/sessions' component={ DnDSessions } />
          <Route path='/npcs' component={ DnDNPCs } />
          <Route path='/locations' component={ DnDLocations } />
          <Route path='/quests' component={ DnDQuests } />
          <Route path='/items' component={ DnDItems } />
          <Route path='/misc' component={ DnDMiscCampaignNotes } />
        </Switch>
      </HashRouter>
    </Theme>
  </ThemeStore>
);