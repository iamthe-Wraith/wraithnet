import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { MainEmpty } from '../MainEmpty';
import { Theme } from '../Theme';
import { UserLog } from '../UserLog';

export const MainRouter = () => (
    <ThemeStore>
        <Theme>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={ MainEmpty } />
                    <Route path='/user-log' component={ UserLog } />
                </Switch>
            </HashRouter>
        </Theme>
    </ThemeStore>
);