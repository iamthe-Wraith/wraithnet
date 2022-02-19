import { observer } from 'mobx-react';
import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { Themes } from '../../constants';
import { UserContext } from '../User';

export const ThemeContext = createContext(null);

export const ThemeStoreBase: FC = ({ children }) => {
    const user = useContext(UserContext);
    const [theme, setTheme] = useState(user.settings.theme);

    useEffect(() => {
        setTheme(user.settings.theme);
    }, [user.settings.theme]);

    const switchTheme = useCallback((newTheme: Themes) => {
        setTheme(newTheme);
        // TODO: save theme to users settings in db
        // TODO: save theme to local config
    }, [theme]);

    return (
        <ThemeContext.Provider value={ {switchTheme, theme} }>
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeStore = observer(ThemeStoreBase);