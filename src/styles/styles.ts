import styled, { createGlobalStyle, keyframes } from 'styled-components';
import './fonts/Orbitron/static/Orbitron-Regular.ttf';
import './fonts/Orbitron/static/Orbitron-Medium.ttf';
import './fonts/Orbitron/static/Orbitron-SemiBold.ttf';
import './fonts/Orbitron/static/Orbitron-Bold.ttf';
import './fonts/Orbitron/static/Orbitron-ExtraBold.ttf';
import './fonts/Orbitron/static/Orbitron-Black.ttf';
import './fonts/Rajdhani/Rajdhani-Light.ttf';
import './fonts/Rajdhani/Rajdhani-Regular.ttf';
import './fonts/Rajdhani/Rajdhani-Medium.ttf';
import './fonts/Rajdhani/Rajdhani-SemiBold.ttf';
import './fonts/Rajdhani/Rajdhani-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Orbitron";
    src: local("Orbitron"), url("./fonts/Orbitron-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Orbitron-Medium";
    src: local("Orbitron Medium"), local("Orbitron-Medium"), url("./fonts/Orbitron-Medium.ttf"), format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Orbitron-SemiBold";
    src: local("Orbitron SemiBold"), local("Orbitron-SemiBold"), url("./fonts/Orbitron-SemiBold.ttf"), format("truetype");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Orbitron-Bold";
    src: local("Orbitron Bold"), local("Orbitron-Bold"), url("./fonts/Orbitron-Bold.ttf"), format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Orbitron-ExtraBold";
    src: local("Orbitron Extra Bold"), local("Orbitron-ExtraBold"), url("./fonts/Orbitron-ExtraBold.ttf"), format("truetype");
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: "Orbitron-Black";
    src: local("Orbitron Black"), local("Orbitron-Black"), url("./fonts/Orbitron-Black.ttf"), format("truetype");
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Rajdhani";
    src: local('Rajdhani Light'), local('Rajdhani-Light'), url('./fonts/Rajdhani-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: "Rajdhani-Regular";
    src: local('Rajdhani Regular'), local('Rajdhani-Regular'), url('./fonts/Rajdhani-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: "Rajdhani-Medium";
    src: local('Rajdhani Medium'), local('Rajdhani-Medium'), url('./fonts/Rajdhani-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: "Rajdhani-SemiBold";
    src: local('Rajdhani SemiBold'), local('Rajdhani-SemiBold'), url('./fonts/Rajdhani-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: "Rajdhani-Bold";
    src: local('Rajdhani Bold'), local('Rajdhani-Bold'), url('./fonts/Rajdhani-Bold.ttf') format('truetype');
    font-weight: 600;
    font-style: italic;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

/**
 * STYLED COMPONENTS
 */
export const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AppContainer = styled.div`
  background: radial-gradient(ellipse at top left, ${({ theme }) => theme.darkestGray}, ${({ theme }) => theme.dark});
  overflow: hidden;
  
  * {
    box-sizing: border-box;
    color: ${({ theme }) => theme.light};
    font-family: Rajdhani;
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
`;

export const PrimaryFont = styled.div`
    font-family: "Orbitron";
    letter-spacing: .05em;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.error };
  font-size: 14px;
  margin: 0;
  text-align: left;
`;

export const FlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const FlexHorizontalCenter = styled.div`
  display: flex;
  align-items: center;
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
