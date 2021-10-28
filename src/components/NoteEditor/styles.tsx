import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

const headerHeight = 50;

export const NoteEditorContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    max-height: 100%;
    overflow: hidden;

    .confirmation-modal {
        ${ FlexCol }
        justify-content: space-between;
        flex-grow: 1;
    }
`;

export const Header = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    justify-content: space-between;
    min-height: ${headerHeight}px;
    padding: 10px 0;

    .name {
        min-width: 50%;

        span {
            ${ PrimaryFont }
            font-size: 24px;
        }
    }

    .ctas-container {
        ${ FlexHorizontalCenter }
    }

    .edit-button {
        ${ FlexHorizontalCenter }

        &:hover {
            svg {
                fill: ${({theme}) => theme.primary};
            }    
            
            span {
                color: ${({theme}) => theme.primary};
            }
        }

        svg {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            fill: ${({theme}) => theme.light};
        }
    }
`;

export const Body = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    flex-grow: 1;
    align-items: stretch;
    max-height: calc(100% - ${headerHeight}px);
    min-height: calc(100% - ${headerHeight}px);
    overflow: hidden;

    .main-col {
        ${ FlexCol }
        ${ NoScrollBar }
        flex-grow: 1;
        overflow: scroll;

        .note-editor-textarea,
        .note-editor-textarea textarea {
            display: flex;
            flex-grow: 1;
            min-width: 100%;
        }
    
        .note-editor-textarea textarea {
            padding: 5px;
        }
    }

    .right-col {
        min-width: 200px;
        max-width: 200px;
        border-left: ${({theme}) => `1px solid ${theme.darkestGray}`};
        overflow: hidden;

        .property-container {
            margin-bottom: 10px;
            padding: 0 5px;

            .header {
                ${ PrimaryFont }
                margin-bottom: 5px;
                color: ${({theme}) => theme.primary};
            }
        }
    }
`;
