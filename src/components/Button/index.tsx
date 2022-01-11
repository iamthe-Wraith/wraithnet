import React, { FC } from 'react';

import { Btn } from './styles';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: ButtonType;
    className?: string;
    disabled?: boolean;
    onClick:(e: React.MouseEvent<HTMLElement>) => void;
    onHover?:(e: React.MouseEvent<HTMLElement>) => void;
}

export enum ButtonType {
    Primary = 'primary',
    PrimaryReverse = 'primary-reverse',
    Secondary = 'secondary',
    SecondaryReverse = 'secondary-reverse',
    Blank = 'blank',
    BlankReverse = 'blank-reverse',
    Link = 'link',
    SecondaryLink = 'secondary-link',
    Error = 'error'
}

export const Button: FC<IProps> = ({
    buttonType = ButtonType.Primary,
    children,
    className,
    disabled = false,
    type = 'button',
    onClick,
    ...restProps
}) => (
    <Btn
        className={ `${buttonType} ${className}` }
        disabled={ disabled }
        onClick={ onClick }
        type={ type }
        { ...restProps }
    >
        { children }
    </Btn>
);
