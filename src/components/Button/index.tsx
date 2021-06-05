import React, { FC } from 'react';
import { render } from 'react-dom';

import { Container, Primary, Secondary } from './styles';

interface IProps {
  className?: string;
  disabled?: boolean;
  onClick:() => void;
  type?: ButtonType;
}

export enum ButtonType {
  Primary,
  Secondary
}

export const Button: FC<IProps> = ({
  children,
  className,
  disabled = false,
  onClick,
  type = ButtonType.Primary
}) => {
  const onButtonClick = () => {
    onClick();
  }

  const render = () => {
    const button = (
      <button
        disabled={ disabled }
        onClick={ onButtonClick }
      >
        { children }
      </button>
    );

    switch (type) {
      case ButtonType.Primary: return <Primary className={ `${ disabled && 'disabled' }` }>{ button }</Primary>;
      case ButtonType.Secondary: return <Secondary className={ `${ disabled && 'disabled' }` }>{ button }</Secondary>
      default: return button;
    }
  }

  return (
    <Container className={ `${ disabled && 'disabled' } ${className}` }>
      { render() }
    </Container>
  );
};
