import styled from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignsListContainer = styled.div<IThemeProps>`
    ${ AbsoluteCenter }
    width: 400px;
    height: 500px;
    padding: 10px 0;
`;

export const CampaignsContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;