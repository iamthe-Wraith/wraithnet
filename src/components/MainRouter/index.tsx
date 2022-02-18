import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeStore } from '../../contexts/Theme';
import { MainHome } from '../MainHome';
import { Settings } from '../Settings';
import { Theme } from '../Theme';
import { UserLog } from '../UserLog';

export const MainRouter = () => {  
    return (
        <ThemeStore>
            <Theme>
                <Routes>
                    <Route path='/' element={ <MainHome /> } />
                    <Route path='/user-log' element={ <UserLog /> } />
                    <Route path='/settings' element={ <Settings /> } />
                </Routes>
            </Theme>
        </ThemeStore>
    );
};