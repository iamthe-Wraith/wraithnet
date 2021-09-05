import React, { FC, ReactNode, useCallback, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext, Themes } from '../../contexts/Theme';
import { GlobalStyles } from '../../styles/styles';
import { Breeze, PinkBerry } from '../../styles/themes';

interface IProps {
    children: ReactNode;
}

export const Theme: FC<IProps> = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    const getTheme = useCallback(() => {
        switch (theme) {
            case Themes.PinkBerry: return PinkBerry;
            default: return Breeze;  
        }
    }, [theme]);

    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyles theme={ getTheme() } />
            { children }
        </ThemeProvider>
    )
}