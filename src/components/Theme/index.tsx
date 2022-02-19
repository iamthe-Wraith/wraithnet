import React, { FC, ReactNode, useCallback, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { Themes } from '../../constants';
import { ThemeContext } from '../../contexts/Theme';
import { GlobalStyles } from '../../styles/styles';
import { AuroraBorealis, Breeze, DangerousIce, PinkBerry, PlumpCandy, PoisonIvy, Villain } from '../../styles/themes';

interface IProps {
    children: ReactNode;
}

export const Theme: FC<IProps> = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    const getTheme = useCallback(() => {
        switch (theme) {
            case Themes.PinkBerry: return PinkBerry;
            case Themes.PoisonIvy: return PoisonIvy;
            case Themes.DangerousIce: return DangerousIce;
            case Themes.PlumpCandy: return PlumpCandy;
            case Themes.Villain: return Villain;
            case Themes.AuroraBorealis: return AuroraBorealis;
            default: return Breeze;  
        }
    }, [theme]);

    return (
        <ThemeProvider theme={ getTheme() }>
            <GlobalStyles theme={ getTheme() } />
            { children }
        </ThemeProvider>
    );
};