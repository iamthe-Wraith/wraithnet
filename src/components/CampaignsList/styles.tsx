import styled from 'styled-components';
import { AbsoluteCenter, FlexCenter, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
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
    ${ NoScrollBar }
    width: 100%;
    height: calc(100% - 20px);
    overflow-y: auto;

    .no-campaigns {
      ${ FlexCenter };
      padding-top: 30px;
    }
`;