import styled from 'styled-components';
import { AbsoluteCenter } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';

export enum HexSize {
    Tiny = 30,
    Small = 50,
    Medium = 80,
    Large = 120,
    XLarge = 200,
}

export interface IHexProps extends IThemeProps {
    size?: HexSize;
    color?: string;
}

export const HexContainer = styled.div<IHexProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    ${({ size = HexSize.Medium }) => {
        return `
            height: ${size}px;
            width: ${size}px;
        `;
    }}
`;

export const HexChildren = styled.div`
    ${ AbsoluteCenter }
`;

export const HexSvgContainer = styled.div<IHexProps>`
    ${ AbsoluteCenter }
    height: 100%;
    width: 100%;

    & > svg {
        height: 100%;
        width: 100%;
    }
`;