import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {}

const Spinner3Base: React.FC<IProps> = ({ theme }) => {
  const size = 128;

  return (
    <SvgIcon
      id='spinner-3'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path d='M63.978 0V14.8489' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M63.978 113.151V128' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M58.4262 0.220337L59.704 15.0252' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M68.296 112.975L69.5738 127.78' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M52.8744 0.96936L55.474 15.5979' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M72.526 112.402L75.1256 127.031' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.4107 2.15906L51.2881 16.5233' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M76.7119 111.477L80.5893 125.841' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.1232 3.83337L47.1904 17.801' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M80.8096 110.199L85.8767 124.167' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M36.9239 5.99243L43.2248 19.4313' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.7752 108.569L91.032 122.008' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M31.989 8.54803L39.4355 21.4141' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M88.5645 106.586L96.011 119.452' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M27.2744 11.5443L35.7783 23.7494' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M92.1776 104.295L100.726 116.456' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M22.8682 14.9811L32.3855 26.3491' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M95.6144 101.651L105.132 113.063' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M18.7263 18.7263L29.2131 29.2571' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M98.7429 98.7869L109.274 109.274' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.937 22.8682L26.349 32.3856' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.651 95.6144L113.019 105.132' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M11.5442 27.2744L23.7053 35.8224' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M104.251 92.2217L116.456 100.726' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M8.54802 31.989L21.4141 39.4355' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M106.586 88.5646L119.452 96.011' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M5.99242 36.968L19.4313 43.2248' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.569 84.7752L122.008 91.0761' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M3.83338 42.1232L17.801 47.1904' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.199 80.8096L124.167 85.8768' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M2.15905 47.4547L16.5232 51.2881' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M111.477 76.7119L125.841 80.5893' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M0.969341 52.8743L15.5979 55.474' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M112.402 72.5259L127.031 75.1256' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M0.22031 58.4261L15.0251 59.7039' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M112.975 68.296L127.78 69.5738' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M0 64.022H14.8489' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M113.151 64.022H128' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M0.220284 69.5738L15.0251 68.296' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M112.975 59.7039L127.78 58.4261' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M0.969322 75.1256L15.5979 72.5259' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M112.402 55.474L127.031 52.8743' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M2.15903 80.5893L16.5232 76.7119' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M111.477 51.2881L125.841 47.4547' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M3.83339 85.8768L17.801 80.8096' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.199 47.1904L124.167 42.1232' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M5.9924 91.0761L19.4313 84.7752' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.569 43.2248L122.008 36.968' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M8.54803 96.011L21.4141 88.5646' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M106.586 39.4355L119.452 31.989' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M11.5442 100.726L23.7053 92.2217' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M104.251 35.8224L116.456 27.2744' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.937 105.132L26.349 95.6144' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.651 32.3856L113.019 22.8682' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M18.7263 109.274L29.2131 98.7869' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M98.7429 29.2571L109.274 18.7263' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M22.8681 113.063L32.3855 101.651' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M95.6144 26.3491L105.132 14.9811' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M27.2744 116.456L35.7783 104.295' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M92.1776 23.7494L100.726 11.5443' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M31.989 119.452L39.4354 106.586' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M88.5645 21.4141L96.011 8.54803' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M36.9239 122.008L43.2248 108.569' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.7752 19.4313L91.032 5.99243' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.1232 124.167L47.1903 110.199' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M80.8096 17.801L85.8767 3.83337' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.4107 125.841L51.2881 111.477' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M76.7119 16.5233L80.5893 2.15906' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M52.8744 127.031L55.474 112.402' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M72.526 15.5979L75.1256 0.96936' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M58.4262 127.78L59.704 112.975' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M68.296 15.0252L69.5738 0.220337' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path
          d='M63.978 36.8799C48.9969 36.8799 36.8358 49.041 36.8358 64.022C36.8358 79.0031 48.9969 91.1642 63.978 91.1642C78.959 91.1642 91.1201 79.0031 91.1201 64.022C91.1201 49.041 78.959 36.8799 63.978 36.8799Z'
          fill={ theme.primaryDark }
        />
        <path
          d='M63.978 33.1786C46.926 33.1786 33.1346 46.97 33.1346 64.022C33.1346 81.074 46.926 94.8654 63.978 94.8654C81.0299 94.8654 94.8213 81.074 94.8213 64.022C94.8213 46.97 81.0299 33.1786 63.978 33.1786ZM63.978 93.6317C47.631 93.6317 34.3243 80.325 34.3243 63.978C34.3243 47.631 47.631 34.3243 63.978 34.3243C80.325 34.3243 93.6317 47.631 93.6317 63.978C93.6317 80.369 80.369 93.6317 63.978 93.6317Z'
          fill={ theme.highlight1 }
        />
        <path
          d='M109.362 64.022C109.362 76.0585 104.58 87.6021 96.0692 96.1132C87.558 104.624 76.0145 109.406 63.978 109.406C51.9414 109.406 40.3979 104.624 31.8868 96.1132C23.3756 87.6021 18.5941 76.0585 18.5941 64.022C18.5941 51.9855 23.3756 40.4419 31.8868 31.9308C40.3979 23.4197 51.9414 18.6382 63.978 18.6382C76.0145 18.6382 87.558 23.4197 96.0692 31.9308C104.58 40.4419 109.362 51.9855 109.362 64.022Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'/>
        <path
          d='M63.978 23.9257C86.0971 23.9257 104.074 41.8589 104.074 64.022C104.074 86.1852 86.1411 104.118 63.978 104.118C41.8148 104.118 23.8816 86.1852 23.8816 64.022'
          fill='transparent'
          id='spinner-3-3'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M104.03 66.0489C102.885 88.168 84.0702 105.132 61.9511 104.03C39.832 102.885 22.8681 84.0702 23.9697 61.9511C25.0712 39.832 43.9297 22.8681 66.0489 23.9697'
          fill='transparent'
          id='spinner-3-2'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path
          d='M120.906 66.9301C119.276 98.3463 92.5301 122.492 61.1139 120.862C29.6978 119.232 5.55179 92.4861 7.18209 61.0699C8.81238 29.6537 35.558 5.50776 66.9742 7.13805'
          fill='transparent'
          id='spinner-3-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
      </Container>
    </SvgIcon>
  );
};

export const Spinner3 = withTheme(Spinner3Base);