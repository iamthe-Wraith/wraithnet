import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DnDMainHomeContainer = styled.div<IThemeProps>`
    ${ FlexCenter }
    flex-grow: 1;
    padding: 20px 5px 5px;

    .dots {
        align-self: flex-end;
    }
`
