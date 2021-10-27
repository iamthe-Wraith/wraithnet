import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { DnDMainHome } from '../DnDMainHome';
import { DnDNPCs } from '../DnDNPCs';
import { Theme } from '../Theme';

export const DnDCampaignRouter = () => (
    <ThemeStore>
        <Theme>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={ DnDMainHome } />
                    <Route path='/npcs' component={ DnDNPCs } />
                </Switch>
            </HashRouter>
        </Theme>
    </ThemeStore>
);