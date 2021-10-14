import styled from 'styled-components';
import { FlexCenter, FlexCol, FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignContainer = styled.div`
    ${ FlexCol }
    width: 100%;
    height: 100%;
`;

export const HeaderLeftContent = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    justify-content: space-between;
    min-width: 100%;

    .campaign-id {
        padding-left: 10px;
        color: ${({theme}) => theme.darkGray};
    }
`;

export const Main = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;

    .side-col {
        ${ FlexCol }
        justify-content: space-between;
        min-width: 300px;
        max-width: 300px;
    }

    .right-col {
        align-items: flex-end;
        padding: 10px 10px 5px 5px;

        .daily-checklist {
            max-height: 50%;
        }
    }

    .left-col {
        padding: 30px 5px 5px 10px;
    }

    .primary-display {
        ${ FlexCenter }
        flex-grow: 1;
        padding: 10px 5px 5px;
    }
`;

export const Footer = styled.div<IThemeProps>`
    ${ FlexCenter }
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    padding: 5px 10px;
`;