import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {}

const Spinner6Base: React.FC<IProps> = ({ theme }) => {
  const size = 134;

  return (
    <SvgIcon
      id='spinner-6'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M118.377 66.9779H109.519C109.519 43.5119 90.4298 24.4735 67 24.4735V15.6185C95.346 15.6185 118.377 38.6416 118.377 66.9779Z'
          fill='transparent'
          id='spinner-6-2'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M124.445 66.9779C124.445 82.208 118.393 96.8143 107.62 107.584C96.8467 118.353 82.2354 124.403 67 124.403C51.7646 124.403 37.1533 118.353 26.3803 107.584C15.6072 96.8143 9.55502 82.208 9.55502 66.9779C9.55502 59.4367 11.0409 51.9694 13.9278 45.0022C16.8146 38.0351 21.046 31.7046 26.3803 26.3722C31.7145 21.0398 38.0472 16.8099 45.0168 13.924C51.9863 11.0381 59.4562 9.55276 67 9.55276C74.5438 9.55276 82.0137 11.0381 88.9832 13.924C95.9528 16.8099 102.285 21.0398 107.62 26.3722C112.954 31.7046 117.185 38.0351 120.072 45.0022C122.959 51.9694 124.445 59.4367 124.445 66.9779Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path
          d='M113.948 66.9779C113.948 79.425 109.002 91.3623 100.197 100.164C91.3929 108.965 79.4514 113.91 67 113.91C54.5486 113.91 42.6072 108.965 33.8027 100.164C24.9982 91.3623 20.0519 79.425 20.0519 66.9779C20.0519 54.5308 24.9982 42.5935 33.8027 33.792C42.6072 24.9906 54.5486 20.046 67 20.046C79.4514 20.046 91.3929 24.9906 100.197 33.792C109.002 42.5935 113.948 54.5308 113.948 66.9779V66.9779Z'
          fill='transparent'
          stroke={ theme.primaryDark }
          strokeMiterlimit='10'
        />
        <path
          d='M99.3322 66.9779C99.3322 75.5499 95.9258 83.7709 89.8623 89.8322C83.7988 95.8936 75.575 99.2989 67 99.2989C58.425 99.2989 50.2012 95.8936 44.1377 89.8322C38.0742 83.7709 34.6678 75.5499 34.6678 66.9779C34.6678 58.4058 38.0742 50.1848 44.1377 44.1235C50.2012 38.0621 58.425 34.6569 67 34.6569C75.575 34.6569 83.7988 38.0621 89.8623 44.1235C95.9258 50.1848 99.3322 58.4058 99.3322 66.9779V66.9779Z'
          fill='transparent'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M98.4907 11.2795C117.89 22.304 131 43.1134 131 66.9779C131 90.9308 117.757 111.829 98.2249 122.809'
          fill='transparent'
          id='spinner-6-1'
          stroke={ theme.highlight1 }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M15.8443 28.5469C27.537 13.0505 46.0948 3 67 3'
          fill='transparent'
          id='spinner-6-1'
          stroke={ theme.highlight1 }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M67 131C31.7003 131 3 102.31 3 67.0221'
          fill='transparent'
          id='spinner-6-1'
          stroke={ theme.highlight1 }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path d='M67 41.8295V47.6738' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M67 86.3262V92.1262' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M64.7855 41.9623L65.3169 47.7623' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M68.683 86.2376L69.1702 92.0377' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M62.6152 42.2279L63.6339 47.9837' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.3661 86.0163L71.3848 91.7721' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M60.4893 42.715L61.9952 48.338' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M72.0049 85.6621L73.5107 91.2851' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M58.4076 43.3791L60.4007 48.825' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M73.5993 85.1308L75.5924 90.6209' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M56.3702 44.2203L58.8505 49.4891' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M75.1495 84.5109L77.6298 89.7797' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M54.4214 45.1944L57.3446 50.2861' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M76.6554 83.7139L79.5785 88.7613' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M52.5612 46.3898L55.9273 51.1716' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M78.0727 82.8284L81.4387 87.6102' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M50.8339 47.7181L54.5986 52.1899' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M79.4014 81.7658L83.1661 86.2376' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M49.1952 49.2234L53.3585 53.3411' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M80.6415 80.659L84.8049 84.7766' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.7336 50.8174L52.2069 54.5808' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M81.7931 79.4193L86.2664 83.1384' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M46.4048 52.5884L51.1882 55.909' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M82.8118 78.091L87.5952 81.4116' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M45.209 54.4037L50.2581 57.3258' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M83.7419 76.6299L88.791 79.5521' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M44.1903 56.3518L49.5052 58.832' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.4948 75.1688L89.8097 77.6048' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M43.3488 58.3884L48.8408 60.3815' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.1592 73.6192L90.6512 75.6123' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.6844 60.4694L48.3537 61.9753' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.6464 71.981L91.3156 73.4869' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.2415 62.6389L47.955 63.6576' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M86.045 70.3428L91.7585 71.3615' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M41.9315 64.8084L47.7336 65.2956' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M86.2664 68.6603L92.0685 69.1918' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M41.8429 66.9779H47.6893' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M86.3107 66.9779H92.1571' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M41.9315 69.1918L47.7336 68.6603' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M86.2664 65.2956L92.0685 64.8084' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.2415 71.3615L47.955 70.3428' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M86.045 63.6576L91.7585 62.6389' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.6844 73.4869L48.3537 71.981' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.6464 61.9753L91.3156 60.4694' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M43.3488 75.6123L48.8408 73.6192' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.1592 60.3815L90.6512 58.3884' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M44.1903 77.6048L49.5052 75.1688' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M84.4948 58.832L89.8097 56.3518' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M45.209 79.5521L50.2581 76.6299' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M83.7419 57.3258L88.791 54.4037' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M46.4048 81.4116L51.1882 78.091' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M82.8118 55.909L87.5952 52.5884' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.7336 83.1384L52.2069 79.4193' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M81.7931 54.5808L86.2664 50.8174' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M49.1952 84.7766L53.3585 80.659' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M80.6415 53.3411L84.8049 49.2234' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M50.8339 86.2376L54.5986 81.7658' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M79.4014 52.1899L83.1661 47.7181' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M52.5612 87.6102L55.9273 82.8284' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M78.0727 51.1716L81.4387 46.3898' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M54.4214 88.7613L57.3446 83.7139' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M76.6554 50.2861L79.5785 45.1944' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M56.3702 89.7797L58.8505 84.5109' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M75.1495 49.4891L77.6298 44.2203' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M58.4076 90.6209L60.4007 85.1308' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M73.5993 48.825L75.5924 43.3791' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M60.4893 91.2851L61.9952 85.6621' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M72.0049 48.338L73.5107 42.715' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M62.6152 91.7721L63.6339 86.0163' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.3661 47.9837L71.3848 42.2279' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M64.7855 92.0377L65.3169 86.2376' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M68.683 47.7623L69.1702 41.9623' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
      </Container>
    </SvgIcon>
  );
};

export const Spinner6 = withTheme(Spinner6Base);