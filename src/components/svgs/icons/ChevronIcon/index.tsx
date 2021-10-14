import React, { FC } from 'react';
import { ChevronSvg } from './styles';

export enum ChevronOrientation {
    Up = 'up',
    Right = 'right',
    Down = 'down',
    Left = 'left',
}

interface IProps {
    className?: string;
    fill?: string;
    orientation?: ChevronOrientation; 
}

export const ChevronIcon:FC<IProps> = ({ className = '', fill = '', orientation = ChevronOrientation.Down }) => {
    return (
        <ChevronSvg
            className={ `${className} ${orientation}` }
            id='chevron-svg'
            viewBox={ `0 0 24 24` }
            width={ 24 }
            height={ 24 }
            fill={ fill }
        >
            <path d='M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z'></path>
        </ChevronSvg>
    )
}