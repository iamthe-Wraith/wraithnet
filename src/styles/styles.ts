import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import './fonts/Orbitron/Orbitron-Regular.ttf';
import './fonts/Orbitron/Orbitron-Medium.ttf';
import './fonts/Orbitron/Orbitron-SemiBold.ttf';
import './fonts/Orbitron/Orbitron-Bold.ttf';
import './fonts/Orbitron/Orbitron-ExtraBold.ttf';
import './fonts/Orbitron/Orbitron-Black.ttf';

import './fonts/OpenSans/OpenSans-Bold.ttf';
import './fonts/OpenSans/OpenSans-BoldItalic.ttf';
import './fonts/OpenSans/OpenSans-ExtraBold.ttf';
import './fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf';
import './fonts/OpenSans/OpenSans-Italic.ttf';
import './fonts/OpenSans/OpenSans-Light.ttf';
import './fonts/OpenSans/OpenSans-LightItalic.ttf';
import './fonts/OpenSans/OpenSans-Medium.ttf';
import './fonts/OpenSans/OpenSans-MediumItalic.ttf';
import './fonts/OpenSans/OpenSans-Regular.ttf';
import './fonts/OpenSans/OpenSans-SemiBold.ttf';
import './fonts/OpenSans/OpenSans-SemiBoldItalic.ttf';
import './fonts/OpenSans/OpenSans.ttf';
import { IThemeProps } from './themes';

export const GlobalStyles = createGlobalStyle<IThemeProps>`
  * {
    box-sizing: border-box;
    color: ${({ theme }) => theme.light};
    font-family: OpenSans;
    font-weight: 300;
    letter-spacing: 1px;
    margin: 0;
    padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    label,
    .font-1 {
    font-family: "Orbitron";
    letter-spacing: .05em;
    }

  body {
    margin: 0;
    padding: 0;
  }

  .tiny-popover {
      z-index: 5;
  }
`;

/**
 * STYLED COMPONENTS
 */
export const AbsoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AppContainer = styled.div<IThemeProps>`
  background: radial-gradient(ellipse at top left, ${({theme}) => `${theme.dark}, ${theme.dark}, ${theme.primaryDark}35`});
  overflow: hidden;
`;

export const PrimaryFont = css`
    font-family: "Orbitron";
    letter-spacing: .05em;
`;

export const Error = css`
  color: ${({ theme }) => theme.error };
  font-size: 14px;
  margin: 0;
  text-align: left;
`;

export const FlexCenter = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

export const FlexHorizontalCenter = css`
  display: flex;
  align-items: center;
`;

export const NoScrollBar = css`
    &::-webkit-scrollbar {
        display: none;
    }
`;

/**
 * ANIMATIONS
 */
export const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const rotateMulti1 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(270deg);
  }
  50% {
    transform: rotate(-100deg);
  }
  75% {
    transform: rotate(130deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const rotateMulti2 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(210deg);
  }
  40% {
    transform: rotate(-145deg);
  }
  60% {
    transform: rotate(90deg);
  }
  80% {
    transform: rotate(-280deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const rotateMulti3 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(170deg);
  }
  40% {
    transform: rotate(-85deg);
  }
  60% {
    transform: rotate(190deg);
  }
  80% {
    transform: rotate(-130deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const rotateAbs = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const rotateMultiAbs = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(270deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(-100deg);
  }
  75% {
    transform: translate(-50%, -50%) rotate(130deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
`;
