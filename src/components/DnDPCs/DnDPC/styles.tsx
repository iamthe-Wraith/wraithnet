import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, PrimaryFont } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';
import { AngleCorner } from '../../containers/AngleCorner';

export const PCContainer = styled(AngleCorner)<IThemeProps>`
    position: relative;
    width: 100%;
    padding: 7px 10px 10px;
    text-align: left;

    &:hover {
        .actions-container {
            display: flex;
        }
    }

    .pc-name {
        justify-content: flex-start;
        padding: 0;

        div {
            ${ PrimaryFont }
            color: ${({theme}) => theme.primary};
        }
    }

    .metadata {
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        padding: 5px 0;
    }

    .actions-container {
        ${ FlexHorizontalCenter }
        position: absolute;
        right: 0;
        bottom: -4px;
        display: none;
        justify-content: flex-end;
        width: 100px;
    }

    .pc-action-button {
        padding: 0 3px;

        &:hover {
            .xp-icon {
                color: ${({theme}) => theme.primary};
            }

            svg {
                fill: ${({theme}) => theme.primary};
            }
        }

        .xp-icon {
            color: ${({theme}) => theme.light};
        }

        svg {
            width: 15px;
            height: 15px;
            fill: ${({theme}) => theme.light};
        }
    }
`;

export const LeveledUpContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    align-items: center;

    div:not(.leveled-up-level) {

    }

    div.leveled-up-level {
        ${ PrimaryFont }
        font-size: 96px;
        color: ${({theme}) => theme.highlight1};
    }
`;

export const XPInputContainer = styled(AngleCorner)<IThemeProps>`
    position: relative;

    .xp-input-close {
        position: absolute;
        bottom: calc(100% - 5px);
        left: calc(100% - 10px);
    }

    .xp-text-input {
        border: none;
    }
`;
