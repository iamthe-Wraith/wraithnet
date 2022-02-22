import { observer } from 'mobx-react';
import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { Themes } from '../../constants';
import { DashboardIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/dashboard';
import { ErrorMessagesContext } from '../ErrorMessages';
import { ToasterContext } from '../Toaster';
import { UserContext } from '../User';

export const ThemeContext = createContext(null);

export const ThemeStoreBase: FC = ({ children }) => {
    const user = useContext(UserContext);
    const toaster = useContext(ToasterContext);
    const errorMessages = useContext(ErrorMessagesContext);
    const [theme, setTheme] = useState(user?.settings.theme);

    useEffect(() => {
        window.addEventListener('theme-updated', user?.loadSettings);
    }, []);

    useEffect(() => {
        setTheme(user?.settings.theme);
    }, [user?.settings?.theme]);

    const switchTheme = useCallback(async (newTheme: Themes) => {
        try {
            setTheme(newTheme);
            await user.updateSettings({ theme: newTheme });
            // TODO: save theme to local config
            IpcRenderer.updateTheme(newTheme);
            toaster.push({ message: 'Theme updated' });
        } catch (err: any) {
            errorMessages.push({ message: err.message });
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={ {switchTheme, theme} }>
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeStore = observer(ThemeStoreBase);