import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../../styles/styles';

interface IThemeColor {
    color: string;
}

export const ThemeColor = styled.div<IThemeColor>`
    width: 25px;
    height: 25px;
    background: ${({color}) => color};
`;

export const ThemeColors = styled.div`
    ${ FlexHorizontalCenter }

    & > *:not(:last-child) {
        margin-right: 3px;
    }
`;

export const ThemeOptionContainer = styled.div`
    ${ FlexHorizontalCenter }

    & > *:first-child {
        min-width: 125px;
        max-width: 125px;
        font-size: 12px;
    }

    & > *:not(:last-child) {
        margin-right: 10px;
    }
`;
