import React, { SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {
    className?: string;
    height?: number;
    id: string;
    viewBox: string;
    width?: number;
    x?: number;
    y?: number;
}

export const SvgIcon: React.FC<React.PropsWithChildren<IProps>> = ({
    className = '',
    children,
    height = 0,
    id,
    viewBox,
    width = 0,
    x = 0,
    y = 0,
    ...restProps
}) => {
    return (
        <svg
            className={ className }
            id={ id }
            viewBox={ viewBox }
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x={ `${x}px` }
            y={ `${y}px` }
            width={ `${width}px` }
            height={ `${height}px` }
            { ...restProps }
        >
            { children }
        </svg>
    );
};
