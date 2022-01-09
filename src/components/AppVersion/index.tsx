import React from 'react';
import { APP } from '../../version';
import { AppVersionContainer } from './styles';

interface IProps {
    className?: string;
}

export const AppVersion: React.FC<IProps> = ({
    className = '',
}) => {
    return (
        <AppVersionContainer className={ className }>
            version { APP.version }
        </AppVersionContainer>
    );
};
