import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {
  duration?: number;
}

const Spinner2Base: React.FC<IProps> = ({ theme }) => {
  const size = 134;

  return (
    <SvgIcon
      id='spinner-2'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M119.72 67C119.72 73.9233 118.356 80.7788 115.707 87.175C113.057 93.5713 109.174 99.3831 104.278 104.279C99.383 109.174 93.5712 113.057 87.175 115.707C80.7787 118.356 73.9233 119.72 67 119.72C53.0179 119.72 39.6084 114.165 29.7215 104.279C19.8346 94.3917 14.2802 80.9822 14.2802 67C14.2802 53.0179 19.8346 39.6084 29.7215 29.7215C39.6084 19.8347 53.0179 14.2803 67 14.2803C73.9233 14.2803 80.7787 15.6439 87.175 18.2933C93.5712 20.9427 99.383 24.8261 104.278 29.7215C109.174 34.617 113.057 40.4288 115.707 46.8251C118.356 53.2213 119.72 60.0768 119.72 67V67Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M131 67C131 83.9739 124.257 100.253 112.255 112.255C100.253 124.257 83.9739 131 67 131C50.0261 131 33.7475 124.257 21.7452 112.255C9.74284 100.253 3 83.9739 3 67C3 50.0261 9.74284 33.7475 21.7452 21.7452C33.7475 9.74284 50.0261 3 67 3C83.9739 3 100.253 9.74284 112.255 21.7452C124.257 33.7475 131 50.0261 131 67V67Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M67 8.23895C99.236 8.23895 125.383 34.3864 125.383 66.6224C125.383 98.8584 99.236 125.006 67 125.006C34.764 125.006 8.61653 98.9056 8.61653 66.6224'
          fill='transparent'
          id='spinner-2-1'
          stroke={ theme.highlight1 }
          strokeWidth='12'
          strokeMiterlimit='10'
        />
        <path
          d='M112.546 67C112.546 79.0795 107.747 90.6642 99.2057 99.2057C90.6642 107.747 79.0795 112.546 67 112.546C54.9206 112.546 43.3358 107.747 34.7943 99.2057C26.2529 90.6642 21.4543 79.0795 21.4543 67C21.4543 54.9205 26.2529 43.3358 34.7943 34.7943C43.3358 26.2528 54.9206 21.4543 67 21.4543C79.0795 21.4543 90.6642 26.2528 99.2057 34.7943C107.747 43.3358 112.546 54.9205 112.546 67Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path d='M67 21.4071V30.6106' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M67 103.342V112.546' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M63.0354 21.5959L63.8378 30.7522' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M70.1622 103.201L70.9646 112.357' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M59.0708 22.1151L60.6755 31.177' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M73.3244 102.776L74.9292 111.838' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M55.2006 22.9646L57.6077 31.8378' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M76.3924 102.115L78.7995 110.988' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M51.4248 24.1445L54.5398 32.8289' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M79.4602 101.171L82.5752 109.808' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M47.7434 25.702L51.6136 34.0088' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M82.3865 99.9439L86.2567 108.298' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M44.2036 27.4956L48.8289 35.472' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M85.1711 98.4808L89.7965 106.457' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M40.8525 29.6667L46.1387 37.1711' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M87.8613 96.7817L93.1475 104.286' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M37.6903 32.0737L43.6372 39.1062' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M90.3628 94.8466L96.3097 101.879' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M34.764 34.764L41.2773 41.2773' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M92.7227 92.6755L99.236 99.1888' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M32.0738 37.6902L39.1534 43.59' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.8466 90.3628L101.926 96.2625' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.6667 40.8525L37.2183 46.1387' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.7818 87.8141L104.333 93.1003' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M27.5428 44.2036L35.5192 48.7817' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M98.4809 85.1711L106.457 89.7493' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.7021 47.7433L34.0561 51.6136' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.944 82.3392L108.298 86.2566' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.1918 51.3776L32.829 54.5398' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M101.171 79.413L109.808 82.5752' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M22.9646 55.2006L31.885 57.5604' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M102.115 76.3923L111.035 78.7522' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M22.1151 59.0708L31.177 60.6755' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M102.823 73.2773L111.885 74.882' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M21.5959 62.9882L30.7523 63.7905' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M103.248 70.1622L112.404 70.9646' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M21.4543 67H30.6579' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M103.342 67H112.546' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M21.596 70.9646L30.7523 70.1622' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M103.248 63.7905L112.404 62.9882' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M22.1151 74.882L31.1771 73.2773' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M102.823 60.6755L111.885 59.0708' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M22.9646 78.7522L31.8849 76.3923' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M102.115 57.5604L111.035 55.2006' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.1918 82.5752L32.829 79.413' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M101.171 54.5398L109.808 51.3776' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.7021 86.2566L34.0561 82.3392' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.944 51.6136L108.298 47.7433' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M27.5429 89.7493L35.5193 85.1711' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M98.4809 48.7817L106.457 44.2036' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.6668 93.1003L37.2184 87.8141' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.7818 46.1387L104.333 40.8525' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M32.0738 96.2625L39.1534 90.3628' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.8466 43.59L101.926 37.6902' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M34.7641 99.1888L41.2774 92.6755' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M92.7227 41.2773L99.236 34.764' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M37.6903 101.879L43.6372 94.8466' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M90.3628 39.1062L96.3097 32.0737' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M40.8525 104.286L46.1386 96.7817' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M87.8613 37.1711L93.1475 29.6667' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M44.2036 106.457L48.8289 98.4808' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M85.1711 35.472L89.7965 27.4956' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M47.7434 108.298L51.6136 99.9439' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M82.3865 34.0088L86.2567 25.702' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M51.4248 109.808L54.5398 101.171' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M79.4602 32.8289L82.5752 24.1445' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M55.2006 110.988L57.6077 102.115' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M76.3924 31.8378L78.7995 22.9646' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M59.0708 111.838L60.6755 102.776' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M73.3244 31.177L74.9292 22.1151' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M63.0354 112.357L63.8378 103.201' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M70.1622 30.7522L70.9646 21.5959' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path 
          d='M125.431 66.6224C125.431 82.1192 119.275 96.9812 108.317 107.939C97.3589 118.897 82.4968 125.053 67 125.053C51.5032 125.053 36.6412 118.897 25.6833 107.939C14.7254 96.9812 8.56935 82.1192 8.56935 66.6224C8.56935 51.1256 14.7254 36.2635 25.6833 25.3057C36.6412 14.3478 51.5032 8.19171 67 8.19171C82.4968 8.19171 97.3589 14.3478 108.317 25.3057C119.275 36.2635 125.431 51.1256 125.431 66.6224Z'
          stroke={ theme.primaryDark }
          fill='transparent'
          strokeMiterlimit='10'
        />
      </Container>
    </SvgIcon>
  );
};

export const Spinner2 = withTheme(Spinner2Base);