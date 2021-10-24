import styled, { css } from 'styled-components';
import { IThemeProps } from '../../styles/themes';

const max = css`
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
`;

export const EditorContainer = styled.div<IThemeProps>`
    ${ max }
    display: flex;
    padding: 10px;

    .editor-container {
        ${ max }

        .editor-textarea {
            ${ max }
            display: flex;
    
            textarea {
                ${ max }
                padding: 10px;
            }
        }
    }

    .markdown-container {
        ${ max }
        overflow: auto;

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
            padding: 10px 0;
        }
    }
`;
