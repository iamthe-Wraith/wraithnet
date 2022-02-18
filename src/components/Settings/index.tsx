import React from 'react';
import { SettingsContainer } from './styles';

interface IProps {
    className?: string;
}

export const Settings: React.FC<IProps> = ({
    className = '',
}) => {
    return (
        <SettingsContainer className={ className }>
            temp Settings
        </SettingsContainer>
    );
};
