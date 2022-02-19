import React, { createContext, FC, useCallback, useContext, useState } from 'react';
import { Themes } from '../../constants';
import { ConfigContext } from '../Config';

export const ThemeContext = createContext(null);

export const ThemeStore: FC = ({ children }) => {
    const { config } = useContext(ConfigContext);
    const [theme, setTheme] = useState(config.theme);

    const switchTheme = useCallback((newTheme: Themes) => setTheme(newTheme), [theme]);

    return (
        <ThemeContext.Provider value={ {switchTheme, theme} }>
            {children}
        </ThemeContext.Provider>
    );
};