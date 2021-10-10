import styled from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignsListContainer = styled.div<IThemeProps>`
    ${ AbsoluteCenter }
    width: 400px;
    height: 500px;
    background: ${({theme}) => theme.dark};
    border: ${({theme}) => `1px solid ${ theme.primary }`};
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;