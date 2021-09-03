import styled from 'styled-components';
import { IThemeProps } from '../../styles/themes';

export const Day = styled.div`
    padding: 0.5em;

    &.disabled {
        color: ${({theme}: IThemeProps) => theme.darkGray};
    }

    &.end,
    &.selected,
    &.start {
        background: ${({theme}: IThemeProps) => theme.primaryDark}50;
        color: ${({theme}: IThemeProps) => theme.primary};
    }

    &.end,
    &.start {
        position: relative;
        &:before {
            content: ' ';
            border: 1px solid ${({theme}: IThemeProps) => theme.primary};
            position: absolute;
            top: 0;
            height: calc(100% - 2px);
            width: 70%;
        }
    }

    &.end {
        &:before {
            border-left: none;
            clip-path: polygon(60% 0, 100% 0, 100% 100%, 0% 100%);
            right: 0;
        }
    }

    &.start {
        &:before {
            border-right: none;
            clip-path: polygon(0 0, 100% 0, 40% 100%, 0 100%);
            left: 0;
        }
    }

    &.today:not(.selected):not(.start):not(.end) {
        color: ${({theme}: IThemeProps) => theme.highlight1};
    }
`;

export const DayPickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .DayPicker {
        display: inline-block;
        font-size: 1rem;
    }

    .DayPicker-wrapper {
        position: relative;

        flex-direction: row;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .DayPicker-Months {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .DayPicker-Month {
        display: table;
        margin: 0 1em;
        margin-top: 1em;
        border-spacing: 0;
        border-collapse: collapse;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .DayPicker-NavButton--interactionDisabled {
        display: none;
    }

    .DayPicker-Caption {
        display: none;
    }

    .DayPicker-Caption > div {
        font-weight: 500;
        font-size: 1.15em;
    }

    .DayPicker-Weekdays {
        display: table-header-group;
        margin-top: 1em;
    }

    .DayPicker-WeekdaysRow {
        display: table-row;
    }

    .DayPicker-Weekday {
        display: table-cell;
        padding: 0.5em;
        color: #8B9898;
        text-align: center;
        font-size: 0.875em;
    }

    .DayPicker-Weekday abbr[title] {
        border-bottom: none;
        text-decoration: none;
    }

    .DayPicker-Body {
        display: table-row-group;
    }

    .DayPicker-Week {
        display: table-row;
    }

    .DayPicker-Day {
        cursor: pointer;
        display: table-cell;
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
    }

    .DayPicker-WeekNumber {
        display: table-cell;
        padding: 0.5em;
        min-width: 1em;
        border-right: 1px solid #EAECEC;
        color: #8B9898;
        vertical-align: middle;
        text-align: right;
        font-size: 0.75em;
        cursor: pointer;
    }

    .DayPicker--interactionDisabled .DayPicker-Day {
        cursor: default;
    }

    .DayPicker-Footer {
        padding-top: 0.5em;
    }

    .DayPicker-TodayButton {
        border: none;
        background-color: transparent;
        background-image: none;
        box-shadow: none;
        color: #4A90E2;
        font-size: 0.875em;
        cursor: pointer;
    }

    /* Default modifiers */

    .DayPicker-Day--today {
        color: ${({theme}: IThemeProps) => theme.highlight2};
        font-weight: 700;
    }

    .DayPicker-Day--outside {
        color: #8B9898;
        cursor: default;
    }

    .DayPicker-Day--disabled {
        color: ${({theme}: IThemeProps) => theme.darkGray};
        cursor: default;
        /* background-color: #eff1f1; */
    }

    /* Example modifiers */

    .DayPicker-Day--sunday {
        background-color: #F7F8F8;
    }

    .DayPicker-Day--sunday:not(.DayPicker-Day--today) {
        color: #DCE0E0;
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        position: relative;

        color: ${({theme}: IThemeProps) => theme.primary};
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
        // background-color: ${({theme}: IThemeProps) => theme.primaryDark}50;
        // color: ${({theme}: IThemeProps) => theme.primary};
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background-color: ${({theme}: IThemeProps) => theme.primaryDark}50;
    }

    /* DayPickerInput */

    .DayPickerInput {
        display: inline-block;
    }

    .DayPickerInput-OverlayWrapper {
        position: relative;
    }

    .DayPickerInput-Overlay {
        position: absolute;
        left: 0;
        z-index: 1;

        background: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    }

    .dates-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 1em;

        span {
            font-size: 14px;
        }
    }
`;

export const NavBarContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    .daypicker-button {
        margin: 0 10px;
        padding: 5px;

        :disabled {
            .daypicker-button-icon {
                fill: ${({theme}: IThemeProps) => theme.darkGray};
            } 
        }

        :hover:not(:disabled) {
            .daypicker-button-icon {
                fill: ${({theme}: IThemeProps) => theme.primary};
            }   
        }

        &.hide {
            display: none;
        }

        .daypicker-button-icon {
            fill: ${({theme}: IThemeProps) => theme.light};
        }
    }

    .daypicker-button-icon {
        width: 24px;
        height: 24px;
    }

    .daypicker-month {
        min-width: 130px;
        text-align: center; 
    }
`;