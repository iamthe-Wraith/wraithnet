import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {}

const Spinner7Base: React.FC<IProps> = ({ theme }) => {
  const size = 134;

  return (
    <SvgIcon
      id='spinner-7'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M116.468 67C116.468 80.121 111.254 92.7045 101.972 101.982C92.6913 111.26 80.1034 116.473 66.9779 116.473C53.8524 116.473 41.2644 111.26 31.9833 101.982C22.7022 92.7045 17.4881 80.121 17.4881 67C17.4881 53.879 22.7022 41.2955 31.9833 32.0176C41.2644 22.7396 53.8524 17.5273 66.9779 17.5273C80.1034 17.5273 92.6913 22.7396 101.972 32.0176C111.254 41.2955 116.468 53.879 116.468 67Z'
          fill='transparent'
          stroke={ theme.highlight1 }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M125.107 67C125.107 99.0664 99.0997 125.065 67.0222 125.065'
          fill='transparent'
          id='spinner-7-2'
          stroke={ theme.primary }
          strokeMiterlimit='10'
        />
        <path
          d='M8.8927 67C8.8927 34.9335 34.9003 8.93494 66.9779 8.93494'
          fill='transparent'
          id='spinner-7-2'
          stroke={ theme.primary }
          strokeMiterlimit='10'
        />
        <path
          d='M66.9779 131C31.6217 131 3 102.344 3 67'
          fill='transparent'
          id='spinner-7-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M66.9778 3C102.334 3 131 31.6561 131 67'
          fill='transparent'
          id='spinner-7-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M109.733 66.9999C109.733 78.3354 105.229 89.2066 97.2104 97.222C89.1922 105.237 78.3172 109.74 66.9778 109.74C55.6384 109.74 44.7635 105.237 36.7453 97.222C28.7271 89.2066 24.2226 78.3354 24.2226 66.9999C24.2226 55.6645 28.7271 44.7933 36.7453 36.7779C44.7635 28.7625 55.6384 24.2595 66.9778 24.2595C78.3172 24.2595 89.1922 28.7625 97.2104 36.7779C105.229 44.7933 109.733 55.6645 109.733 66.9999Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path d='M66.9778 24.2595V32.8961' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M66.9778 101.148V109.785' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M63.2561 24.4366L64.0093 33.029' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M69.9907 101.015L70.7439 109.608' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M59.5787 24.9239L61.0851 33.4277' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M72.9149 100.617L74.4213 109.12' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M55.9456 25.7211L58.1609 34.0477' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M75.8391 99.9965L78.0543 108.323' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M52.3569 26.8284L55.3254 34.9336' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M78.6746 99.0664L81.6431 107.216' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M48.901 28.2457L52.5784 36.0851' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M81.4216 97.9592L85.0547 105.754' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M45.6224 29.973L49.92 37.4581' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M84.08 96.5861L88.3776 104.027' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M42.4766 31.9661L47.4389 39.0526' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M86.5611 94.9474L91.5233 102.034' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M39.5081 34.2692L45.0464 40.8685' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M88.9536 93.1758L94.4919 99.7751' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M36.7612 36.7938L42.8754 42.9059' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M91.1246 91.1384L97.2388 97.2505' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M34.2357 39.5398L40.8373 45.0761' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M93.1627 88.9682L99.7643 94.5045' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M31.9761 42.5073L39.0208 47.4235' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.9792 86.5765L102.024 91.537' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.938 45.6519L37.4258 49.9481' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.5742 84.0962L104.062 88.3924' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M28.2101 48.9294L36.0523 52.6056' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M97.9477 81.4387L105.746 85.0706' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M26.7923 52.3841L34.9003 55.3516' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.0554 78.6927L107.208 81.6602' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.6847 55.9274L34.0142 58.187' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.9858 75.8582L108.315 78.0735' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.8871 59.6035L33.3939 61.1099' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M100.606 72.9349L109.113 74.4413' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.3998 63.2795L32.9952 64.0327' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M101.005 69.9675L109.6 70.7207' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.2226 67H32.8622' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M101.138 67H109.777' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.3998 70.7207L32.9952 69.9675' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M101.005 64.0327L109.6 63.2795' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M24.8871 74.4413L33.3939 72.9349' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M100.606 61.1099L109.113 59.6035' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M25.6847 78.0735L34.0142 75.8582' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.9858 58.187L108.315 55.9274' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M26.7923 81.6602L34.9003 78.6927' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M99.0554 55.3516L107.208 52.3841' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M28.2101 85.0706L36.0523 81.4387' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M97.9477 52.6056L105.746 48.9294' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M29.938 88.3924L37.4258 84.0962' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M96.5742 49.9481L104.062 45.6519' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M31.9761 91.537L39.0208 86.5765' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M94.9792 47.4235L102.024 42.5073' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M34.2357 94.5045L40.8373 88.9682' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M93.1627 45.0761L99.7643 39.5398' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M36.7612 97.2505L42.8754 91.1384' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M91.1246 42.9059L97.2388 36.7938' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M39.5081 99.7751L45.0464 93.1758' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M88.9536 40.8685L94.4919 34.2692' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M42.4766 102.034L47.4389 94.9474' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M86.5611 39.0526L91.5233 31.9661' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M45.6224 104.027L49.92 96.5861' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M84.08 37.4581L88.3776 29.973' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M48.901 105.754L52.5784 97.9592' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M81.4216 36.0851L85.0547 28.2457' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M52.3569 107.216L55.3254 99.0664' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M78.6746 34.9336L81.6431 26.8284' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M55.9456 108.323L58.1609 99.9965' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M75.8391 34.0477L78.0543 25.7211' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M59.5787 109.12L61.0851 100.617' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M72.9149 33.4277L74.4213 24.9239' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M63.2561 109.608L64.0093 101.015' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path d='M69.9907 33.029L70.7439 24.4366' stroke={ theme.primaryDark } strokeMiterlimit='10'/>
        <path
          d='M96.6629 67C96.6629 74.8702 93.5353 82.4181 87.9683 87.9832C82.4013 93.5483 74.8508 96.6747 66.9779 96.6747C59.1049 96.6747 51.5544 93.5483 45.9874 87.9832C40.4204 82.4181 37.2928 74.8702 37.2928 67C37.2928 59.1298 40.4204 51.5819 45.9874 46.0168C51.5544 40.4517 59.1049 37.3253 66.9779 37.3253C74.8508 37.3253 82.4013 40.4517 87.9683 46.0168C93.5353 51.5819 96.6629 59.1298 96.6629 67V67Z'
          fill='transparent'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M88.4662 67C88.4662 72.6971 86.2023 78.1609 82.1724 82.1894C78.1426 86.2178 72.6769 88.481 66.9778 88.481C61.2788 88.481 55.8131 86.2178 51.7832 82.1894C47.7534 78.1609 45.4894 72.6971 45.4894 67C45.4894 61.3029 47.7534 55.8391 51.7832 51.8107C55.8131 47.7822 61.2788 45.519 66.9778 45.519C72.6769 45.519 78.1426 47.7822 82.1724 51.8107C86.2023 55.8391 88.4662 61.3029 88.4662 67V67Z'
          fill={ theme.primaryDark }
        />
      </Container>
    </SvgIcon>
  );
};

export const Spinner7 = withTheme(Spinner7Base);