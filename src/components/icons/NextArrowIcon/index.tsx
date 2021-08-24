import * as React from "react";

interface IProps {
    className?: string;
}

export const NextArrowIcon: React.FC<IProps> = ({ className = '' }) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className={ className }
        >
            <g>
                <path fill="none" d="M0 0h24v24H0z" /><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </g>
        </svg>
    )
}