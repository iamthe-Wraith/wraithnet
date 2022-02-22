import { observer } from 'mobx-react';
import React, { useCallback, useContext, useRef } from 'react';
import { Themes } from '../../constants';
import { ThemeContext } from '../../contexts/Theme';
import { UserContext } from '../../contexts/User';
import { AuroraBorealis, Breeze, DangerousIce, PinkBerry, PlumpCandy, PoisonIvy, Villain } from '../../styles/themes';
import { Header, SettingsContainer, ThemeOptionsContainer } from './styles';
import { IThemeOption, ThemeOption } from './ThemeOption';

interface IProps {
    className?: string;
}

const getThemes = (): IThemeOption[] => {
    return [
        {
            name: Themes.Breeze,
            theme: Breeze,
        },
        {
            name: Themes.PinkBerry,
            theme: PinkBerry,
        },
        {
            name: Themes.PoisonIvy,
            theme: PoisonIvy,
        },
        {
            name: Themes.DangerousIce,
            theme: DangerousIce,
        },
        {
            name: Themes.PlumpCandy,
            theme: PlumpCandy,
        },
        {
            name: Themes.Villain,
            theme: Villain,
        },
        {
            name: Themes.AuroraBorealis,
            theme: AuroraBorealis,
        },
    ];
};

const SettingsBase: React.FC<IProps> = ({
    className = '',
}) => {
    const user = useContext(UserContext);
    const { switchTheme } = useContext(ThemeContext);
    const themes = useRef(getThemes()).current;

    const onOptionChange = useCallback((option: IThemeOption) => {
        switchTheme(option.name);
    }, []);

    const renderThemeOptions = () => {
        const options = themes.map(t => (
            <ThemeOption
                key={ t.name }
                className='theme-option'
                option={ t }
                selected={ t.name === user?.settings.theme }
                onSelect={ onOptionChange }
            />
        ));
        return (
            <ThemeOptionsContainer>
                <Header>Theme</Header>
                <div>
                    { options }
                </div>
            </ThemeOptionsContainer>
        );
    };

    return (
        <SettingsContainer className={ className }>
            { renderThemeOptions() }
        </SettingsContainer>
    );
};

export const Settings = observer(SettingsBase);
