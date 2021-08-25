import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const Btn = styled.button`
    align-items: center;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    outline: none;
    padding: 5px;
    transition: all .15s ease-in-out;

    &:hover {
        cursor: default;
    }

    &.primary {
        ${({theme}: { theme: ITheme }) => (`
            background: ${theme.primary};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.primaryDark};
            }
        `)}
    }

    &.primary-reverse {
        ${({theme}: { theme: ITheme }) => (`
            border: 1px solid ${theme.primary};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.primaryDark}40;
                border: 1px solid ${theme.primaryDark};
            }
        `)}
    }

    &.secondary {
        ${({theme}: { theme: ITheme }) => (`
            background: ${theme.highlight1};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.highlight2};
            }
        `)}
    }

    &.secondary-reverse {
        ${({theme}: { theme: ITheme }) => (`
            border: 1px solid ${theme.highlight1};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.highlight2}40;
                border: 1px solid ${theme.highlight2};
            }
        `)}
    }

    &.blank {
        color: ${({theme}: { theme: ITheme }) => theme.light};
    }
`;
