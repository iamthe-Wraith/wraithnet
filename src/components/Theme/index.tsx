import React, { FC, ReactNode, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext, Themes } from '../../contexts/Theme';
import { GlobalStyles } from '../../styles/styles';
import { Breeze, PinkBerry } from '../../styles/themes';

interface IProps {
    children: ReactNode;
}

export const Theme: FC<IProps> = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    const getTheme = () => {
        switch (theme) {
            case Themes.PinkBerry: return PinkBerry;
            default: return Breeze;  
        }
    }

    return (
        <ThemeProvider theme={getTheme()}>
            <GlobalStyles theme={ getTheme() } />
            { children }
        </ThemeProvider>
    )
}