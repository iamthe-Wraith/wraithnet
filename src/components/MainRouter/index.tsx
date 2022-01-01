import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { MainHome } from '../MainHome';
import { Theme } from '../Theme';
import { UserLog } from '../UserLog';

export const MainRouter = () => (
    <ThemeStore>
        <Theme>
            <HashRouter>
                <Routes>
                    <Route path='/' element={ <MainHome /> } />
                    <Route path='/user-log' element={ <UserLog /> } />
                </Routes>
            </HashRouter>
        </Theme>
    </ThemeStore>
);