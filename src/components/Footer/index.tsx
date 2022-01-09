import React from 'react';
import { AppVersion } from '../AppVersion';
import { FooterContainer } from './styles';

export const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <div />
            <div className='right'>
                <AppVersion />
            </div>
        </FooterContainer>
    );
};