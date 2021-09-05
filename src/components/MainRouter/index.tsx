import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { MainHome } from '../MainHome';
import { Theme } from '../Theme';
import { UserLog } from '../UserLog';

export const MainRouter = () => (
    <ThemeStore>
        <Theme>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={ MainHome } />
                    <Route path='/user-log' component={ UserLog } />
                </Switch>
            </HashRouter>
        </Theme>
    </ThemeStore>
);