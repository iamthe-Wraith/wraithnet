import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const Box = styled.div`
    ${ FlexCenter }
    height: 16px;
    margin-right: 10px;
    width: 16px;

    &.disabled {
        opacity: .5;
    }

    &.light {
        border: 1px solid ${({theme}: IThemeProps) => theme.light};

        &.checked {
            background: ${({theme}: IThemeProps) => theme.light}40;

            svg {
                fill: ${({theme}: IThemeProps) => theme.light};
            }
        }
    }

    &.primary {
        border: 1px solid ${({theme}: IThemeProps) => theme.primary};

        &.checked {
            background: ${({theme}: IThemeProps) => theme.primaryDark}40;

            svg {
                fill: ${({theme}: IThemeProps) => theme.primary};
            }
        }
    }

    &.secondary {
        border: 1px solid ${({theme}: IThemeProps) => theme.highlight1};

        &.checked {
            background: ${({theme}: IThemeProps) => theme.highlight1}40;

            svg {
                fill: ${({theme}: IThemeProps) => theme.highlight1};
            }
        }
    }
`;

export const CheckboxContainer = styled.label`
    align-items: center;
    display: flex;
`;