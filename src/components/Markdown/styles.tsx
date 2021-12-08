import styled from 'styled-components';
import { NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const MarkdownContainer = styled.div<IThemeProps>`
    ${ NoScrollBar }

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

    ul {
        padding: 5px 0 5px 18px;

        li {
            position: relative;
            list-style: none;  

            &:before {
                content: ' ';
                position: absolute;
                top: 50%;
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
        width: 80%;
        margin: 5px 0;
        border-spacing: 0;

        th {
            ${ PrimaryFont }
            padding: 3px 10px 3px 5px;
            color: ${({theme}) => theme.primary};
            border-bottom: ${({theme}) => `2px solid ${theme.gray}`};
            white-space: nowrap;
        }

        tr {
            &:not(:last-child) {
                td {
                    border-bottom: ${({theme}) => `1px solid ${theme.darkGray}`};
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
