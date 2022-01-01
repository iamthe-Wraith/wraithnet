import React, { FC } from 'react';
import { SvgIcon } from '../../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const CheckIcon:FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='check-svg'
            viewBox={ `0 0 24 24` }
            width={ 24 }
            height={ 24 }
            fill={ fill }
        >
            <path d='M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z'></path>
        </SvgIcon>
    );
};