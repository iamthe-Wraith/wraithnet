import styled from 'styled-components';
import { FlexCol, NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const AnchorContainer = styled.div<IThemeProps>`
    ${ PrimaryFont }
`;

export const SimpleNoteListContainer = styled.div<IThemeProps>`
    ${ FlexCol }

    .list-container {
        ${ NoScrollBar }
        flex-grow: 1;
        overflow: auto;

        .simple-note-item {
            margin-bottom: 8px;
        }
    }
`;
