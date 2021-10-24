import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

const headerHeight = 50;

export const NoteEditorContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    max-height: 100%;
    overflow: hidden;
`;

export const Header = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    justify-content: space-between;
    min-height: ${headerHeight}px;

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
    
        .markdown-container {
            &::-webkit-scrollbar {
                display: none;
            }

            & > :first-child {
                margin-top: 0;
                padding-top: 0; 
            }
    
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                padding: 20px 0 10px;
                color: ${({theme}) => theme.primary};
            }
    
            a {
                color: ${({theme}) => theme.primary};
                text-decoration: none;
            }
    
            p {
                padding: 5px 0;
            }
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
                margin-bottom: 5px;
            }
        }
    }
`;
