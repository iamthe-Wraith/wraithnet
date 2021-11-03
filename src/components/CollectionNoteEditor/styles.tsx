import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CollectionNoteEditorContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: stretch;
`

export const FilterContainer = styled.div<IThemeProps>`
    position: relative;
    ${ FlexCol }
    min-width: 220px;
    max-width: 220px;
    margin-right: 30px;
    padding: 10px 0;
`;

export const ListContainer = styled.div`
    flex-grow: 1;
    padding-bottom: 10px;

    .header {
        ${ PrimaryFont }
        margin-bottom: 10px;
        font-size: 18px;
        color: ${({theme}) => theme.primary };
        text-align: center;
    }

    .list {
        ${ NoScrollBar }
        height: calc(100% - 60px);
        overflow: auto;

        .no-items {
            padding-top: 20px;
            color: ${({theme}) => theme.gray};
            text-align: center;
        }
    }

    .spinner-container {
        position: relative;
        width: 100%;
        height: 40px;
    }

    .footer {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        min-height: 35px;
        max-height: 35px;
    }
`;

export const NoteEditorContainer = styled.div`
    ${ FlexCol }
    position: relative;
    flex-grow: 1;

    .back-button {
        padding: 0;
    }

    .editor {
        min-width: 100%;
        min-height: calc(100% - 20px);
    }
`;

export const NewNoteModal = styled.div<IThemeProps>`
    .label {
        font-size: 12px;
        color: ${({theme}) => theme.gray};
    }
`;

export const SearchContainer = styled.div`
    .clear-search-container {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        padding-bottom: 10px;

        button {
            padding-top: 4px;
        }
    }
`;