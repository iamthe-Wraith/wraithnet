import React, { FC } from 'react';
import { IThemeProps } from '../../../styles/themes';
import { SvgIcon } from '../SvgIcon';

interface IProps {
    className?: string;
    fill?: string;
}

export const HexSvg: FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='hex-svg'
            viewBox={ `0 0 980 849` }
            width={ 980 }
            height={ 849 }
        >
            <path d='M735 848.8H245L0 424.4L245 0H735L980 424.4L735 848.8ZM266.2 812.1H713.9L937.7 424.4L713.8 36.7H266.2L42.3 424.4L266.2 812.1Z' fill={ fill } />
        </SvgIcon>
    );
};
