import styled from 'styled-components';
import { FlexCenter, FlexCol } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export enum StatPosition {
    Top = 'top',
    RightTop = 'right-top',
    RightBottom = 'right-bottom',
    Bottom = 'bottom',
    LeftBottom = 'left-bottom',
    LeftTop = 'left-top'
}

export interface IStatProps extends IThemeProps {
    position: StatPosition;
}

export const DnDMainHomeContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    flex-grow: 1;
    padding: 20px 5px 5px;

    .data-container {
        position: relative;
        display: flex;
        flex-grow: 1;
    }

    .dots {}
`;

export const StatsContainer = styled.div<IThemeProps>`
    ${ FlexCenter }
    min-width: 100%;
    min-height: 100%;

    .center {
        position: relative;
    }

    .center-icon {
        width: 100px;
        height: 100px;
        fill: ${({theme}) => theme.gray};
    }

    .dnd-stat {
        position: absolute;
        min-width: 100px;

        &.top,
        &.bottom {
            .label,
            .stat {
                padding: 0;
                text-align: center;
            }
        }

        &.left-bottom,
        &.left-top {
            .label {
                text-align: right;
            }

            .stat {
                padding: 0 15px 0 0;
                text-align: right;
            }
        }
    }

    .top {
        bottom: 100%;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }

    .right-top {
        top: 0;
        left: 100%;
    }

    .right-bottom {
        bottom: 0;
        left: 100%;
    }

    .bottom {
        top: 100%;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }

    .left-bottom {
        bottom: 0;
        right: 100%;
    }

    .left-top {
        top: 0;
        right: 100%;
    }
`;