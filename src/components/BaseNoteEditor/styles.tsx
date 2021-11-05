import styled from 'styled-components';
import { FlexCol, NoScrollBar } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const BaseNoteEditorContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    ${ NoScrollBar }
    flex-grow: 1;
    max-width: 100%;
    max-height: 100%;
    overflow: scroll;

    .editor-textarea,
    .editor-textarea textarea {
        ${ NoScrollBar }
        display: flex;
        flex-grow: 1;
        min-width: 100%;
    }

    .editor-textarea textarea {
        padding: 5px;
    }
`
