import styled from 'styled-components';
import { NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const MarkdownContainer = styled.div<IThemeProps>`
    ${ NoScrollBar }
    max-width: 100%;

    & > * {
        max-width: 100%;
    }

    & > :first-child {
        margin-top: 0;
        padding-top: 0; 
    }

    & > div {
        padding: 5px 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        padding: 20px 0 10px;
        color: ${({theme}) => theme.primary};

        & * {
            ${ PrimaryFont }
            color: ${({theme}) => theme.primary};
        }
    }

    strong {
        font-weight: 700;
    }

    hr {
        margin: 20px 0;
    }

    blockquote {
        display: block;
        margin: 10px 0;
        padding: 10px 20px;
        border-left: ${({theme}) => `3px solid ${theme.primary}`};
    }

    pre code {
        display: block;
        margin: 10px 0;
        padding: 15px 20px;
        font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
        font-size: 12px;
        font-weight: lighter;
        background: ${({theme}) => theme.darkestGray};
        line-height: 1.6em;
        white-space: normal;
    }

    a {
        color: ${({theme}) => theme.primary};
        text-decoration: none;
    }

    .tiny-popover-anchor {
        display: inline-block;
        
        &:hover {
            cursor: default;

            .ref-anchor {
                color: ${({theme}) => theme.highlight2};
            }
        }

        .ref-anchor {
            color: ${({theme}) => theme.highlight1};
        }
    }

    ul,
    ol {
        padding: 8px 0 8px 25px; 

        li {
            &:not(:last-child) {
                padding-bottom: 4px;
            }
        }
    }

    ul {
        li {
            position: relative;
            list-style: none;  

            &:before {
                content: ' ';
                position: absolute;
                top: 10px;
                right: calc(100% + 8px);
                width: 5px;
                height: 5px;
                transform: translate3d(0, -50%, 0);
                border-radius: 50%;
                background: ${({theme}) => theme.primary};
            }
        }
    }

    table {
        width: max-content;
        max-width: 90%;
        margin: 20px 0;
        border-spacing: 0;

        thead,
        tbody {
            max-width: 100%;
        }

        th {
            ${ PrimaryFont }
            padding: 3px 10px 3px 5px;
            color: ${({theme}) => theme.primary};
            border-bottom: ${({theme}) => `2px solid ${theme.darkGray}`};
            white-space: pre-wrap;
        }

        tr {
            &:not(:last-child) {
                td {
                    border-bottom: ${({theme}) => `1px solid ${theme.darkerGray}`};
                }
            }

            td {
                padding: 3px 10px 3px 5px;

                &:last-child {
                    width: 100%;
                }
            }
        }
    }

    img {
      width:80%;
      max-width: 700px;
    }
`;
