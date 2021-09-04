import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {}

const Spinner4Base: React.FC<IProps> = ({ theme }) => {
  const size = 134;

  return (
    <SvgIcon
      id='spinner-4'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M15.8443 28.5557C27.537 13.054 46.0948 3 67 3C102.3 3 131 31.7003 131 67C131 90.9612 117.757 111.866 98.2249 122.851'
          id='spinner-4-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M67 131C31.7003 131 3 102.3 3 67'
          id='spinner-4-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M127.058 67C127.058 74.887 125.505 82.6967 122.486 89.9833C119.468 97.2699 115.044 103.891 109.468 109.468C103.891 115.044 97.2698 119.468 89.9832 122.487C82.6966 125.505 74.8869 127.058 67 127.058C51.0716 127.058 35.7956 120.731 24.5325 109.468C13.2694 98.2045 6.94185 82.9284 6.94185 67C6.94185 51.0716 13.2694 35.7956 24.5325 24.5325C35.7956 13.2694 51.0716 6.94189 67 6.94189C74.8869 6.94189 82.6966 8.49534 89.9832 11.5135C97.2698 14.5317 103.891 18.9556 109.468 24.5325C115.044 30.1094 119.468 36.7302 122.486 44.0168C125.505 51.3034 127.058 59.1131 127.058 67Z'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path
          d='M116.916 67C116.916 80.2384 111.657 92.9346 102.296 102.296C92.9346 111.657 80.2384 116.916 67 116.916C53.7616 116.916 41.0654 111.657 31.7044 102.296C22.3434 92.9346 17.0844 80.2384 17.0844 67C17.0844 53.7615 22.3434 41.0653 31.7044 31.7043C41.0654 22.3434 53.7616 17.0844 67 17.0844C80.2384 17.0844 92.9346 22.3434 102.296 31.7043C111.657 41.0653 116.916 53.7615 116.916 67V67Z'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'/>
        <path d='M67 14.0284V28.6886' stroke={ theme.highlight1 } strokeWidth='4' strokeMiterlimit='10'/>
        <path d='M67 105.311V119.927' stroke={ theme.highlight1 } strokeWidth='4' strokeMiterlimit='10'/>
        <path d='M62.3938 14.2498L63.3239 24.9239' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.6761 109.076L71.6062 119.75' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M57.7875 14.8699L59.6477 25.3668' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M74.308 108.589L76.1681 119.13' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M53.2699 15.8443L56.0602 26.164' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M77.9398 107.792L80.6858 118.156' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M48.8851 17.2616L52.5612 27.2713' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M81.4387 106.684L85.1149 116.738' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M44.6332 18.989L49.1508 28.6886' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.8491 105.311L89.3668 114.967' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M40.5142 21.1592L45.8733 30.4159' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M88.1266 103.584L93.4858 112.841' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M36.6166 23.6394L42.773 32.3647' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M91.227 101.591L97.3834 110.361' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M32.9405 26.4298L39.8498 34.6236' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M94.1502 99.3765L101.015 107.57' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M29.5744 29.5744L37.1038 37.1038' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M96.8519 96.8519L104.426 104.426' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M26.4297 32.9848L34.6235 39.8498' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M99.3765 94.1502L107.57 101.015' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M23.6394 36.6166L32.3647 42.773' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.591 91.227L110.361 97.3834' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M21.1592 40.5142L30.4159 45.8734' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M103.584 88.1266L112.841 93.4858' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M18.9889 44.6332L28.6886 49.1509' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M105.267 84.8492L114.967 89.3668' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M17.2173 48.8851L27.2713 52.5613' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M106.684 81.4388L116.738 85.1149' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M15.8443 53.3142L26.164 56.0602' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M107.792 77.9398L118.156 80.6858' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.8699 57.7875L25.3668 59.6477' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.589 74.3522L119.13 76.2124' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.2498 62.3938L24.8796 63.3239' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M109.076 70.6761L119.75 71.6063' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.0284 67H28.6886' stroke={ theme.highlight1 } strokeWidth='4' strokeMiterlimit='10'/>
        <path d='M105.311 67H119.927' stroke={ theme.highlight1 } strokeWidth='4' strokeMiterlimit='10'/>
        <path d='M14.2498 71.6063L24.8796 70.6761' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M109.076 63.3239L119.75 62.3938' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.8699 76.2124L25.3668 74.3522' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.589 59.6477L119.13 57.7875' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M15.8443 80.6858L26.164 77.9398' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M107.792 56.0602L118.156 53.3142' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M17.2173 85.1149L27.2713 81.4388' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M106.684 52.5613L116.738 48.8851' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M18.9889 89.3668L28.6886 84.8492' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M105.267 49.1509L114.967 44.6332' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M21.1592 93.4858L30.4159 88.1266' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M103.584 45.8734L112.841 40.5142' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M23.6394 97.3834L32.3647 91.227' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.591 42.773L110.361 36.6166' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M26.4297 101.015L34.6235 94.1502' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M99.3765 39.8498L107.57 32.9848' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M29.5744 104.426L37.1038 96.8519' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M96.8519 37.1038L104.426 29.5744' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M32.9405 107.57L39.8498 99.3765' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M94.1502 34.6236L101.015 26.4298' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M36.6166 110.361L42.773 101.591' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M91.227 32.3647L97.3834 23.6394' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M40.5142 112.841L45.8733 103.584' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M88.1266 30.4159L93.4858 21.1592' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M44.6332 114.967L49.1508 105.311' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.8491 28.6886L89.3668 18.989' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M48.8851 116.738L52.5612 106.684' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M81.4387 27.2713L85.1149 17.2616' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M53.2699 118.156L56.0602 107.792' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M77.9398 26.164L80.6858 15.8443' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M57.7875 119.13L59.6477 108.589' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M74.308 25.3668L76.1681 14.8699' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M62.3938 119.75L63.3239 109.076' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.6761 24.9239L71.6062 14.2498' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path
          d='M97.7377 68.5945C96.8519 85.5578 82.4131 98.6236 65.4055 97.7377C48.4422 96.8519 35.3765 82.4132 36.2623 65.4056C37.1481 48.4422 51.5869 35.3765 68.5945 36.2623'
          id='spinner-4-2'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
      </Container>
    </SvgIcon>
  );
};

export const Spinner4 = withTheme(Spinner4Base);