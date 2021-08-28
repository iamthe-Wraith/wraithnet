import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {}

const Spinner8Base: React.FC<IProps> = ({ theme }) => {
  const size = 130;

  return (
    <SvgIcon
      id='spinner-8'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M119.749 65H110.31C110.31 39.9852 89.9675 19.6903 65 19.6903V10.2507C95.2065 10.2507 119.749 34.7935 119.749 65Z'
          fill='transparent'
          id='spinner-8-2'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M115.029 64.9999C115.029 78.2686 109.759 90.9938 100.376 100.376C90.9938 109.758 78.2686 115.029 65 115.029C51.7314 115.029 39.0062 109.758 29.6238 100.376C20.2415 90.9938 14.9705 78.2686 14.9705 64.9999C14.9705 51.7313 20.2415 39.0061 29.6238 29.6238C39.0062 20.2414 51.7314 14.9705 65 14.9705C78.2686 14.9705 90.9938 20.2414 100.376 29.6238C109.759 39.0061 115.029 51.7313 115.029 64.9999V64.9999Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path d='M65 23.702V33.2831' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M65 96.7168V106.298' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M61.413 23.8909L62.2153 33.4248' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M67.7846 96.6224L68.587 106.156' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M57.826 24.3629L59.4779 33.8024' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M70.5221 96.2448L72.174 105.684' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M54.3333 25.118L56.7876 34.3687' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M73.2124 95.6312L75.6667 104.882' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M50.8879 26.2035L54.1445 35.2183' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M75.8555 94.8289L79.1121 103.796' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M47.5369 27.5723L51.5959 36.2566' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M78.4041 93.7433L82.4631 102.428' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M44.3746 29.2714L49.1416 37.5309' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M80.8584 92.469L85.6253 100.776' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M41.3068 31.2065L46.8289 39.0413' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M83.1711 91.0059L88.6932 98.8407' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M38.4749 33.3776L44.6106 40.7404' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M85.3893 89.3068L91.525 96.6696' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M35.7847 35.8318L42.5811 42.5811' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M87.4189 87.4189L94.2153 94.2153' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M33.3776 38.4749L40.6932 44.6106' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M89.3068 85.3893L96.6224 91.5722' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M31.1593 41.3539L39.0413 46.8289' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M90.9587 83.2183L98.8407 88.6932' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.2242 44.3746L37.531 49.1416' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M92.469 80.8584L100.776 85.6725' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M27.5723 47.584L36.2566 51.5958' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M93.7433 78.4041L102.428 82.4631' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M26.2036 50.8879L35.2183 54.1917' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.7817 75.8554L103.796 79.1592' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.118 54.3333L34.3687 56.7876' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M95.6312 73.2124L104.882 75.7138' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.3156 57.8259L33.7552 59.5251' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.2448 70.5221L105.684 72.174' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M23.8437 61.413L33.4248 62.2625' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.5752 67.7846L106.156 68.6342' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M23.7021 65H33.2832' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.7168 65H106.298' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M23.8437 68.6342L33.4248 67.7846' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.5752 62.2625L106.156 61.413' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.3156 72.174L33.7552 70.5221' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.2448 59.5251L105.684 57.8259' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.118 75.7138L34.3687 73.2124' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M95.6312 56.7876L104.882 54.3333' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M26.2036 79.1592L35.2183 75.8554' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.7817 54.1917L103.796 50.8879' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M27.5723 82.4631L36.2566 78.4041' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M93.7433 51.5958L102.428 47.584' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.2242 85.6725L37.531 80.8584' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M92.469 49.1416L100.776 44.3746' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M31.1593 88.6932L39.0413 83.2183' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M90.9587 46.8289L98.8407 41.3539' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M33.3776 91.5722L40.6932 85.3893' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M89.3068 44.6106L96.6224 38.4749' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M35.7847 94.2153L42.5811 87.4189' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M87.4189 42.5811L94.2153 35.8318' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M38.4749 96.6696L44.6106 89.3068' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M85.3893 40.7404L91.525 33.3776' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M41.3068 98.8407L46.8289 91.0059' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M83.1711 39.0413L88.6932 31.2065' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M44.3746 100.776L49.1416 92.469' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M80.8584 37.5309L85.6253 29.2714' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M47.5369 102.428L51.5959 93.7433' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M78.4041 36.2566L82.4631 27.5723' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M50.8879 103.796L54.1445 94.8289' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M75.8555 35.2183L79.1121 26.2035' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M54.3333 104.882L56.7876 95.6312' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M73.2124 34.3687L75.6667 25.118' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M57.826 105.684L59.4779 96.2448' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M70.5221 33.8024L72.174 24.3629' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M61.413 106.156L62.2153 96.6224' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M67.7846 33.4248L68.587 23.8909' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path
          d='M91 65C91 71.8956 88.2607 78.5088 83.3848 83.3848C78.5088 88.2607 71.8956 91 65 91C58.1044 91 51.4912 88.2607 46.6152 83.3848C41.7393 78.5088 39 71.8956 39 65C39 58.1044 41.7393 51.4912 46.6152 46.6152C51.4912 41.7393 58.1044 39 65 39C71.8956 39 78.5088 41.7393 83.3848 46.6152C88.2607 51.4912 91 58.1044 91 65V65Z'
          fill='transparent'
          id='spinner-8-rotate-vertical'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M91 65C91 71.8956 88.2607 78.5088 83.3848 83.3848C78.5088 88.2607 71.8956 91 65 91C58.1044 91 51.4912 88.2607 46.6152 83.3848C41.7393 78.5088 39 71.8956 39 65C39 58.1044 41.7393 51.4912 46.6152 46.6152C51.4912 41.7393 58.1044 39 65 39C71.8956 39 78.5088 41.7393 83.3848 46.6152C88.2607 51.4912 91 58.1044 91 65V65Z'
          fill='transparent'
          id='spinner-8-rotate-horizontal'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M129 65C129 73.4046 127.345 81.7269 124.128 89.4917C120.912 97.2565 116.198 104.312 110.255 110.255C104.312 116.198 97.2566 120.912 89.4917 124.128C81.7269 127.345 73.4046 129 65 129C48.0261 129 31.7475 122.257 19.7452 110.255C7.74286 98.2525 1 81.9738 1 65C1 48.0261 7.74286 31.7475 19.7452 19.7452C31.7475 7.74283 48.0261 1 65 1C73.4046 1 81.7269 2.65539 89.4917 5.87169C97.2566 9.08799 104.312 13.8022 110.255 19.7452C116.198 25.6881 120.912 32.7434 124.128 40.5082C127.345 48.2731 129 56.5954 129 65Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path
          d='M47.2528 6.7049C79.3982 -3.18126 113.44 14.88 123.302 47.0576C133.163 79.2827 115.147 113.409 83.0489 123.295C50.951 133.181 16.8617 115.12 7 82.9425'
          fill='transparent'
          id='spinner-8-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
      </Container>
    </SvgIcon>
  );
}

export const Spinner8 = withTheme(Spinner8Base);