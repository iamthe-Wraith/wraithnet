import React, { useRef } from 'react';
import { AuroraBorealis, Breeze, DangerousIce, PinkBerry, PlumpCandy, PoisonIvy, Villain } from '../../styles/themes';
import { Header, SettingsContainer, ThemeOptionsContainer } from './styles';
import { IThemeOption, ThemeOption } from './ThemeOption';

interface IProps {
    className?: string;
}

const getThemes = (): IThemeOption[] => {
    return [
        {
            name: 'Breeze',
            theme: Breeze,
        },
        {
            name: 'Pink Berry',
            theme: PinkBerry,
        },
        {
            name: 'Poison Ivy',
            theme: PoisonIvy,
        },
        {
            name: 'Dangerous Ice',
            theme: DangerousIce,
        },
        {
            name: 'Plump Candy',
            theme: PlumpCandy,
        },
        {
            name: 'Villain',
            theme: Villain,
        },
        {
            name: 'Aurora Borealis',
            theme: AuroraBorealis,
        },
    ];
};

export const Settings: React.FC<IProps> = ({
    className = '',
}) => {
    const themes = useRef(getThemes()).current;

    const renderThemeOptions = () => {
        const options = themes.map(t => (
            <ThemeOption
                key={ t.name }
                className='theme-option'
                option={ t }
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
