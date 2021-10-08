import styled from 'styled-components';
import { ITheme, IThemeProps } from '../../styles/themes';

export const Btn = styled.button<IThemeProps>`
    align-items: center;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    outline: none;
    padding: 5px 10px;
    transition: all .15s ease-in-out;

    &:hover {
        cursor: default;
    }

    &.primary {
        ${({theme}) => (`
            background: ${theme.primary};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.primaryDark};
            }
        `)}
    }

    &.primary-reverse {
        ${({theme}) => (`
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
        ${({theme}) => (`
            background: ${theme.highlight1};
            color: ${theme.light};

            &:hover,
            &:focus {
                background: ${theme.highlight2};
            }
        `)}
    }

    &.secondary-reverse {
        ${({theme}) => (`
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
        color: ${({theme}) => theme.light};

        &:hover {
            color: ${({theme}) => theme.primaryDark};
        }
    }

    &.link {
        color: ${({theme}) => theme.primary};
        
        :hover {
            color: ${({theme}) => theme.primaryDark};
        }
    }

    &.secondary-link {
        color: ${({theme}) => theme.highlight1};
        
        :hover {
            color: ${({theme}) => theme.highlight2};
        }
    }
`;
