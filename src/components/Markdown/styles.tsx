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
`
