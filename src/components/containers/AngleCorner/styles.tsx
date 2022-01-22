import styled from 'styled-components';
import { IThemeProps } from '../../../styles/themes';

export enum AngleSize {
    Tiny = 10,
    Small = 25,
    Medium = 50,
    Large = 75,
    XLarge = 100,
}

export enum AnglePos {
    TopLeft = 'top-left',
    TopRight = 'top-right',
    BottomRight = 'bottom-right',
    BottomLeft = 'bottom-left',
}

export interface IAngleConfig {
    position: AnglePos;
    size: AngleSize;
}

export const defaultAngleConfig: IAngleConfig[] = [{
    position: AnglePos.TopRight,
    size: AngleSize.Medium,
}];

export interface IAngleProps extends IThemeProps {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    config?: IAngleConfig[];
}

export const AngleCornerContainer = styled.div<IAngleProps>`
    padding: 5px;
    position: relative;
`;

const getConfigs = (config: IAngleConfig[]) => {
    const topLeft = config.find(c => c.position === AnglePos.TopLeft);
    const topRight = config.find(c => c.position === AnglePos.TopRight);
    const bottomRight = config.find(c => c.position === AnglePos.BottomRight);
    const bottomLeft = config.find(c => c.position === AnglePos.BottomLeft);

    return [topLeft, topRight, bottomRight, bottomLeft];
};

export const Background = styled.div<IAngleProps>`
    background: ${({backgroundColor}) => backgroundColor};
    position: absolute;
    ${({ borderColor, borderWidth }) => {
        const withBorder = !!borderColor || !!borderWidth;
        return `
            top: ${withBorder ? `${borderWidth || 1}px` : 0 };
            right: ${withBorder ? `${borderWidth || 1}px` : 0 };
            bottom: ${withBorder ? `${borderWidth || 1}px` : 0 };
            left: ${withBorder ? `${borderWidth || 1}px` : 0 };
        `;
    }}

    clip-path: polygon(${({ borderColor, borderWidth, config = defaultAngleConfig }) => {
        const [topLeft, topRight, bottomRight, bottomLeft] = getConfigs(config);
        const _borderWidth = (!!borderColor || borderWidth) ? (borderWidth || 1) : 0;
        let path = topLeft ? `${topLeft.size - _borderWidth}px 0%, ` : '0% 0%, ';
        path += topRight ? `calc(100% - ${topRight.size - _borderWidth}px) 0%, 100% ${topRight.size - _borderWidth}px, ` : '100% 0, ';
        path += bottomRight ? `100% calc(100% - ${bottomRight.size - _borderWidth}px), calc(100% - ${bottomRight.size - _borderWidth}px) 100%, ` : '100% 100%, ';
        path += bottomLeft ? `${bottomLeft.size - _borderWidth}px 100%, 0% calc(100% - ${bottomLeft.size - _borderWidth}px)` : '0% 100%';
        path += topLeft ? `, 0% ${topLeft.size - _borderWidth}px` : '';
        return path;
    }});
`;

export const Border = styled.div<IAngleProps>`
    background: ${({borderColor}) => borderColor};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    clip-path: polygon(${({ borderWidth = 1, config = defaultAngleConfig }) => {
        const [topLeft, topRight, bottomRight, bottomLeft] = getConfigs(config);
        let path = topLeft ? `0% ${topLeft.size}px, ` : `0% 0%, `; // 1
        path += bottomLeft ? `0% calc(100% - ${bottomLeft.size}px), ` : `0% 100%, `; // 2
        path += bottomLeft ? `${borderWidth}px calc(100% - ${bottomLeft.size}px), ` : `${borderWidth}px 100%, `; // 3
        path += topLeft ? `${borderWidth}px ${topLeft.size}px, ${topLeft.size}px ${borderWidth}px, ` : `${borderWidth}px ${borderWidth}px, `; // 4 & 5
        path += topRight ? `calc(100% - ${topRight.size}px) ${borderWidth}px, calc(100% - ${borderWidth}px) ${topRight.size}px, ` : `calc(100% - ${borderWidth}px) ${borderWidth}px, `; // 6 & 7
        path += bottomRight ? `calc(100% - ${borderWidth}px) calc(100% - ${bottomRight.size}px), calc(100% - ${bottomRight.size}px) calc(100% - ${borderWidth}px), ` : `calc(100% - ${borderWidth}px) calc(100% - ${borderWidth}px), `; // 8 & 9
        path += bottomLeft ? `${bottomLeft.size}px calc(100% - ${borderWidth}px), ${borderWidth}px calc(100% - ${bottomLeft.size}px), 0% calc(100% - ${bottomLeft.size}px), ${bottomLeft.size}px 100%, ` : `${borderWidth}px calc(100% - ${borderWidth}px), ${borderWidth}px 100%, `;
        path += bottomRight ? `calc(100% - ${bottomRight.size}px) 100%, 100% calc(100% - ${bottomRight.size}px), ` : `100% 100%, `;
        path += topRight ? `100% ${topRight.size}px, calc(100% - ${topRight.size}px) 0%` : `100% 0`;
        path += topLeft ? `, ${topLeft.size}px 0` : '';

        return path;
    }});
`;

export const ChildrenContainer = styled.div`
    min-height: 100%;
    position: relative;
    z-index: 1;
`;
