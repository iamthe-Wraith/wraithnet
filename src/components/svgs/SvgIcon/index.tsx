import React from 'react';

interface IProps {
  height?: number;
  id: string;
  viewBox: string;
  width?: number;
  x?: number;
  y?: number;
}

export const SvgIcon: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  height = 0,
  id,
  viewBox,
  width = 0,
  x = 0,
  y = 0,
}) => {
  return (
    <svg
      id={ id }
      viewBox={ viewBox }
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x={ `${x}px` }
      y={ `${y}px` }
      width={ `${width}px` }
      height={ `${height}px` }
    >
      { children }
    </svg>
  );
};
