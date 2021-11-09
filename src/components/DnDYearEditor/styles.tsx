import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DnDYearEditorContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }

    .year-input {
        flex-grow: 1;
        max-width: 70px;
        border: ${({theme}) => `1px solid ${theme.primaryDark}`};
        
        input {
            width: 100%;
            text-align: center;
        }
    }
`
