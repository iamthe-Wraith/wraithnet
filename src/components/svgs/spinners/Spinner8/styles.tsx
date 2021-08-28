import styled, { keyframes } from 'styled-components';
import { rotateMulti1, rotateMulti2 } from '../../../../styles/styles';

export const rotateHorizontally = keyframes`
  from {
    transform: rotate3d(0, 1, 1, 0deg);
  }
  to {
    transform: rotate3d(0, 1, 1, 360deg);
  }
`;

export const rotateVertically = keyframes`
  from {
    transform: rotate3d(1, 0, 1, 0deg);
  }
  to {
    transform: rotate3d(1, 0, 1, 360deg);
  }
`;

export const Container = styled.g<{ duration?: number }>`
  #spinner-8-1 {
    animation: ${rotateMulti1} ${props => props.duration || 5}s linear infinite;
    transform-origin: center;
  }

  #spinner-8-2 {
    animation: ${rotateMulti2} ${props => props?.duration ? (props.duration + 4) : 9}s linear infinite;
    transform-origin: center;
  }

  #spinner-8-rotate-horizontal {
    animation: ${rotateHorizontally} ${props => props?.duration ? (props.duration) : 3}s linear infinite;
    transform-origin: center;
  }

  #spinner-8-rotate-vertical {
    animation: ${rotateVertically} ${props => props?.duration ? (props.duration) : 3}s linear infinite;
    transform-origin: center;
  }
`;
