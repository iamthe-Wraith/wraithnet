import styled, { css } from 'styled-components';
import { FlexCenter, FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Button } from '../Button';

export const day = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    width: 30px;
`;

export const DnDDayPickerContainer = styled.div<IThemeProps>`
    width: 300px;

    .header {
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        margin-bottom: 10px;

        svg {
            width: 20px;
            height: 20px;
        }
    }

    .days-container {
        ${ FlexHorizontalCenter }
        flex-wrap: wrap;

        & > * {
            min-width: 30px;
            min-height: 30px;
        }
    }

    .special-days-container {
        .day-button {
            width: 100%;
            padding: 0;
        }

        .special-day {
            width: 100%;
            margin-top: 5px;
            text-align: center;

            span:last-child:not(:first-child) {
                display: inline-block;
                margin-left: 5px;
            }
        }
    }

    .ten-day {
        ${ day }
    }

    .popover {
        border: 1px solid red;
    }
`

export const Day = styled(Button)<IThemeProps>`
    ${ day }
    height: 40px;

    &.today:not(.selected) {
        color: ${({theme}) => theme.highlight1};
    }

    &.selected {
        color: ${({theme}) => theme.primary};
        background: ${({theme}) => `${theme.primary}50`}
    }

    &.event {
        &:before {
            content: ' ';
            position: absolute;
            bottom: 10px;
            left: 50%;
            display: block;
            width: 3px;
            height: 3px;
            background: ${({theme}) => theme.primary};
            border-radius: 50%;
            transform: translate3d(-50%, 0, 0);
        }
    }
`;
