import React, { useRef } from 'react';
import { SvgIcon } from '../../svgs/SvgIcon';
import { v4 as uuid } from 'uuid';

interface IProps {
    className?: string;
    color?: string;
}

export const LogIcon: React.FC<IProps> = ({ className = '', color = '' }) => {
    const id = useRef(uuid()).current;

    return (
        <SvgIcon
            id={ id }
            className={ className }
            stroke={ color }
            strokeWidth="0"
            viewBox="0 0 24 24"
            height={ 24 }
            width={ 24 }
        >
            <path d="M7 18H17V16H7V18Z" fill={ color }></path>
            <path d="M17 14H7V12H17V14Z" fill={ color }></path>
            <path d="M7 10H11V8H7V10Z" fill={ color }></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill={ color }></path>
        </SvgIcon>
    )
}