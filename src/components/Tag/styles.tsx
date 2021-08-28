import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const TagContainer = styled.div`
    aligh-items: center;
    border: 1px solid ${({theme}: { theme: ITheme }) => theme.highlight1};
    border-radius: 30px;
    color: ${({theme}: { theme: ITheme }) => theme.light};
    display: flex;
    font-size: 11px;
    line-height: 1em;
    padding: 4px 10px 2px;

    &.highlight {
        background: ${({theme}: { theme: ITheme }) => theme.highlight1}30;
    }

    &.withHover {
        transition: background .2s ease-in-out;

        :hover {
            background: ${({theme}: { theme: ITheme }) => theme.highlight1}30;
            cursor: default;
        }
    }
`;