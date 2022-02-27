import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Button } from '../Button';

export const AnchorContainer = styled(Button)<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: center;
    min-width: 70px;
    max-width: 200px;
    padding: 5px 2px 5px 10px;
    border: ${({theme}) => `1px solid ${theme.primaryDark}`};
    text-align: left;

    & > :first-child:not(.chevron) {
        flex-grow: 1;
    }

    .multi-select-anchor {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .chevron {
        ${ FlexCenter}
        min-width: 20px;
        fill: ${({theme}) => theme.light};

        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

export const DropdownContainer = styled.div<IThemeProps>``;

export const OptionsContainer = styled.div<IThemeProps>`
    ${ NoScrollBar }
    min-width: 70px;
    max-height: 200px;
    background: ${({theme}) => theme.dark};
    overflow: auto;
`;

export const Option = styled(Button)<IThemeProps>`
    width: 100%;
    text-align: left;

    &.option:hover:not(:disabled),
    &.selected {
        background: ${({theme}) => `${theme.primary}50`};
        color: ${({theme}) => theme.primary} !important;
    }
`;
