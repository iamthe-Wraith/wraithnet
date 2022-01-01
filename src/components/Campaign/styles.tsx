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

    .back-button {
        ${ FlexHorizontalCenter }

        &:hover:not(:disabled) {
            svg {
                fill: ${({theme}) => theme.highlight1};
            }

            span {
                color: ${({theme}) => theme.highlight1};
            }
        }

        svg {
            width: 18px;
            height: 18px;
            fill: ${({theme}) => theme.light};
        }
    }

    .campaign-id {
        padding-left: 10px;
        color: ${({theme}) => theme.darkGray};
    }
`;

export const Main = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    max-height: calc(100% - 180px);

    .side-col {
        ${ FlexCol }
        justify-content: space-between;
        min-width: 320px;
        max-width: 320px;
    }

    .right-col {
        align-items: flex-end;
        padding: 20px 10px 5px 5px;

        .misc-resources {
            flex-grow: 1;
            width: 100%;
            margin-bottom: 20px;
            overflow: hidden;
        }

        .daily-checklist {
            max-height: 50%;
            width: calc(100% - 20px);
        }
    }

    .left-col {
        padding: 30px 5px 5px 10px;
        
        .pcs {
            flex-grow: 1;
            margin-top: 15px;
            width: 100%;
        }
    }

    .primary-display {
        ${ FlexCenter }
        flex-grow: 1;
        max-width: calc(100% - 640px);
        min-width: calc(100% - 640px);
        padding: 20px 5px 5px;

        & > * {
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            overflow: hidden;
        }
    }
`;

export const Footer = styled.div<IThemeProps>`
    ${ FlexCenter }
    justify-content: space-between;
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    padding: 5px 10px;
`;