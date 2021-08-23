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
        cursor: pointer;
    }

    &.primary {
        ${({theme}: { theme: ITheme }) => (`
            background: ${theme.primary};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.primaryDark};
            }

            &:focus {
                outline: 1px dashed ${theme.primaryDark};
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

            &:focus {
                outline: 1px dashed ${theme.primaryDark};
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

            &:focus {
                outline: 1px dashed ${theme.highlight2};
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

            &:focus {
                outline: 1px dashed ${theme.highlight2};
            }
        `)}
    }

    &.blank:focus {
        outline: 1px dashed ${({ theme }: { theme: ITheme }) => theme.primary};
    }
`;
