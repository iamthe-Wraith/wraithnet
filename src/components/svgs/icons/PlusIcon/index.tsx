import React, { FC } from 'react';
import { SvgIcon } from '../../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const PlusIcon: FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='plus-icon'
            viewBox={ `0 0 1024 1024` }
            width={ 1024 }
            height={ 1024 }
            fill={ fill }
        >
            <path d='M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z' />
            <path d='M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z' />
        </SvgIcon>
    );
};
