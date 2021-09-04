import styled from 'styled-components';
import { rotateMulti1, rotateMulti2, rotateMulti3 } from '../../../../styles/styles';

export const Container = styled.g<{ duration?: number }>`
  #spinner-3-1 {
    animation: ${rotateMulti1} ${props => props.duration || 5}s linear infinite;
    transform-origin: center;
  }

  #spinner-3-2 {
    animation: ${rotateMulti2} ${props => props?.duration ? (props.duration + 2) : 7}s linear infinite;
    transform-origin: center;
  }

  #spinner-3-3 {
    animation: ${rotateMulti3} ${props => props?.duration ? (props.duration + 4) : 9}s linear infinite;
    transform-origin: center;
  }
`;
