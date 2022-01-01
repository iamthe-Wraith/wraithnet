import * as React from "react";
import { SvgIcon } from "../../SvgIcon";

interface IProps {
    className?: string;
    fill?: string;
}

export const NoteIcon: React.FC<IProps> = ({ className = '', fill = '' }) => {
    return (
        <SvgIcon
            className={ className }
            id='note-svg'
            viewBox={ `0 0 14 16` }
            width={ 14 }
            height={ 16 }
            fill={ fill }
        >
            <path fillRule='evenodd' d='M3 10h4V9H3v1zm0-2h6V7H3v1zm0-2h8V5H3v1zm10 6H1V3h12v9zM1 2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H1z'></path>
        </SvgIcon>
    );
};
