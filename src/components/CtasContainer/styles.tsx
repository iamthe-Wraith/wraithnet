import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CtasContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: stretch;
    justify-content: flex-end;
    padding-top: 10px;

    & > *:not(:last-child) {
        margin-right: 5px;
    }
`
