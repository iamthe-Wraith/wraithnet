import { animated } from 'react-spring';
import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const ToasterContainer = styled(animated.div)<IThemeProps>`
  ${ FlexCenter }
  position: absolute;
  top: 100px;
  left: 50%;
  max-width: 350px;
  padding: 5px 10px;
  background: ${({theme}) => theme.dark};
  color: white;
  z-index: 999;

  &.success {
    border: ${({theme}) => `1px solid ${theme.primary}`};
  }

  &.warning {
    border: ${({theme}) => `1px solid ${theme.highlight1}`};
  }

  &.error {
    border: ${({theme}) => `1px solid ${theme.error}`};
  }
`;
