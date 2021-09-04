import * as React from "react";

interface IProps {
    className?: string;
    fill?: string;
}

export const PrevArrowIcon: React.FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <svg
            fill={ fill }
            strokeWidth={0}
            viewBox="0 0 24 24"
            className={ className }
        >
            <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
            </g>
        </svg>
    )
}