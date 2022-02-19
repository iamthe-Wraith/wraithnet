import React from 'react';
import { ITheme } from '../../../styles/themes';
import { ThemeColor, ThemeColors, ThemeOptionContainer } from './styles';

export interface IThemeOption {
    name: string;
    theme: ITheme;
}

interface IProps {
    className?: string;
    selected?: boolean;
    option: IThemeOption;
}

export const ThemeOption: React.FC<IProps> = ({
    className = '',
    option,
}) => {
    return (
        <ThemeOptionContainer className={ className }>
            <div>{ option.name }</div>
            <ThemeColors>
                <ThemeColor color={ option.theme.primary } />
                <ThemeColor color={ option.theme.primaryLight } />
                <ThemeColor color={ option.theme.primaryDark } />
                <ThemeColor color={ option.theme.highlight1 } />
                <ThemeColor color={ option.theme.highlight2 } />
            </ThemeColors>
        </ThemeOptionContainer>
    );
};
