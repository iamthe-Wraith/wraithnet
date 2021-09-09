import React, { FC } from 'react';
import { SvgIcon } from '../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const LogoutIcon:FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='hex-svg'
            viewBox={ `0 0 24 24` }
            width={ 24 }
            height={ 24 }
            fill={ fill }
        >
            <g>
                <path fill="none" d="M0 0h24v24H0z"></path><path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z"></path>
            </g>
        </SvgIcon>
    )
}