import React, { ChangeEvent } from 'react';
import { Themes } from '../../../constants';
import { ITheme } from '../../../styles/themes';
import { RadioButton } from '../../RadioButton';
import { ThemeColor, ThemeColors, ThemeOptionContainer } from './styles';

export interface IThemeOption {
    name: Themes;
    theme: ITheme;
}

interface IProps {
    className?: string;
    selected?: boolean;
    option: IThemeOption;
    onSelect(option: IThemeOption): void;
}

export const ThemeOption: React.FC<IProps> = ({
    className = '',
    option,
    selected,
    onSelect,
}) => {
    const onOptionSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onSelect(option);
        }
    };

    return (
        <ThemeOptionContainer className={ className }>
            <div>
                <RadioButton
                    name='theme-options'
                    checked={ !!selected }
                    onChange={ onOptionSelect }
                />
                <span>{ option.name }</span>
            </div>
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
