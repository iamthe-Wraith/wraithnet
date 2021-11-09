import React, { FC } from 'react';
import { SvgIcon } from '../../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const MinusIcon: FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='minus-svg'
            viewBox={ `0 0 24 24` }
            width={ 24 }
            height={ 24 }
            fill={ fill }
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </SvgIcon>
    )
};
