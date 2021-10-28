import styled from 'styled-components';
import { IThemeProps } from '../../../styles/themes';
import { Button } from '../../Button';

export const SessionListItemContainer = styled(Button)<IThemeProps>`
    width: 100%;
    text-align: left;

    & > * {
        width: 100%;
    }
`
