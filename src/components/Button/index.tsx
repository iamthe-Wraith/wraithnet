import React, { FC, useRef } from 'react';

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
  Link = 'link',
  SecondaryLink = 'secondary-link',
}

export const Button: FC<IProps> = ({
  buttonType = ButtonType.Primary,
  children,
  className,
  disabled = false,
  onClick,
  ...restProps
}) => (
    <Btn
        className={ `${buttonType} ${className}` }
        disabled={ disabled }
        onClick={ onClick }
        { ...restProps }
    >
        { children }
    </Btn>
);
