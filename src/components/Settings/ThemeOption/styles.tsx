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
        ${ FlexHorizontalCenter }
        min-width: 145px;
        max-width: 145px;
        font-size: 12px;

        span {
            padding-left: 10px;
        }
    }

    & > *:not(:last-child) {
        margin-right: 10px;
    }
`;
