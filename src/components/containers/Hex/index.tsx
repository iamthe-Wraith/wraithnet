import React, { FC } from 'react';
import { withTheme } from 'styled-components';
import { HexSvg } from '../../svgs/HexSvg';
import { HexChildren, HexContainer, HexSvgContainer, IHexProps } from './styles';

export const HexBase: FC<IHexProps> = ({ children, color, theme, ...restProps }) => {
    const getColor = () => {
        if (!color) {
            return theme.primaryDark;
        }

        return color === 'none' ? '' : color;
    }

    return (
        <HexContainer { ...restProps }>
            <HexSvgContainer { ...restProps }>
                <HexSvg fill={ getColor() } />
            </HexSvgContainer>
            <HexChildren>
                { children }
            </HexChildren>
        </HexContainer>
    )
};

export const Hex = withTheme(HexBase);