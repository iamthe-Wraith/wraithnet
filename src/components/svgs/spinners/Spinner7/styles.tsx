import styled from 'styled-components';
import { rotateMulti1, rotateMulti2 } from '../../../../styles/styles';

export const Container = styled.g<{ duration?: number }>`
  #spinner-7-1 {
    animation: ${rotateMulti1} ${props => props.duration || 5}s linear infinite;
    transform-origin: center;
  }

  #spinner-7-2 {
    animation: ${rotateMulti2} ${props => props?.duration ? (props.duration + 4) : 9}s linear infinite;
    transform-origin: center;
  }
`;
