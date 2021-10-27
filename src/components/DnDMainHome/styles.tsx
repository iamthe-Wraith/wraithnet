import styled from 'styled-components';
import { FlexCenter, FlexCol } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DnDMainHomeContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    flex-grow: 1;
    padding: 20px 5px 5px;

    .data-container {
        flex-grow: 1;
    }

    .dots {}
`
