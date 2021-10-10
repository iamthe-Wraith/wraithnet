import styled from 'styled-components';
import { FlexCol } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignContainer = styled.div`
    ${ FlexCol }
    width: 100%;
    height: 100%;
`;

export const Main = styled.div`
    flex-grow: 1;
    width: 100%;
`;

export const Footer = styled.div<IThemeProps>`
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    border-top: ${({theme}) => `1px solid ${theme.darkGray}`};
`;