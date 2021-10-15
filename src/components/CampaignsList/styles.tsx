import styled from 'styled-components';
import { AbsoluteCenter, FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignsListContainer = styled.div<IThemeProps>`
    ${ AbsoluteCenter }
    width: 400px;
    height: 500px;
    padding: 10px 0;

    .add-campaign-button-container {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        height: 20px;
    }
`;

export const CampaignsContainer = styled.div`
    width: 100%;
    height: calc(100% - 20px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;