import React, { FC, useRef } from 'react';

import { Btn } from './styles';

interface IProps {
  className?: string;
  disabled?: boolean;
  onClick:(e: React.MouseEvent<HTMLElement>) => void;
  onHover?:(e: React.MouseEvent<HTMLElement>) => void;
  type?: ButtonType;
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
  children,
  className,
  disabled = false,
  onClick,
  type = ButtonType.Primary
}) => (
    <Btn
        className={ `${type} ${className}` }
        disabled={ disabled }
        onClick={ onClick }
    >
        { children }
    </Btn>
);
