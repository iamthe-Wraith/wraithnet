import React, { FC } from 'react';
import { IComponentProps } from '../types';

export const ParagraphComponent: FC<IComponentProps> = ({ children }) => {
  return (
    <div className='paragraph'>{ children }</div>
  );
};