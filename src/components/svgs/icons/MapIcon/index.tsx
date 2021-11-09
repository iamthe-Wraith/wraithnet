import React, { FC } from 'react';
import { SvgIcon } from '../../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const MapIcon: FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='map-svg'
            viewBox={ `0 0 16 16` }
            width={ 16 }
            height={ 16 }
            fill={ fill }
        >
            <path fillRule='evenodd' d='M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z' clipRule='evenodd'></path>
        </SvgIcon>
    )
};
