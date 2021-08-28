import React from 'react';
import { Container } from './styles';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {
  meterId?: string;
}

const Spinner5Base: React.FC<IProps> = ({ theme, meterId }) => {
  const size = 134;

  return (
    <SvgIcon
      id='spinner-5'
      viewBox={ `0 0 ${ size } ${ size }` }
      width={ size }
      height={ size }
    >
      <Container>
        <path
          d='M116.535 67.0227C116.535 80.1556 111.316 92.7506 102.027 102.037C92.737 111.323 80.1375 116.54 67 116.54C53.8624 116.54 41.263 111.323 31.9733 102.037C22.6837 92.7506 17.4648 80.1556 17.4648 67.0227C17.4648 53.8898 22.6837 41.2948 31.9733 32.0085C41.263 22.7221 53.8624 17.5051 67 17.5051C80.1375 17.5051 92.737 22.7221 102.027 32.0085C111.316 41.2948 116.535 53.8898 116.535 67.0227Z'
          fill='transparent'
          stroke={ theme.highlight1 }
          strokeMiterlimit='10'
        />
        <path
          d='M91.199 68.2504C90.5167 81.5733 79.145 91.8497 65.8173 91.1677C52.4897 90.4856 42.2096 79.1179 42.8919 65.795C43.5742 52.4721 54.946 42.1957 68.2736 42.8778'
          fill='transparent'
          id='spinner-5-3'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M56.629 33.1925C75.3241 27.4632 95.1108 37.9215 100.888 56.61C106.665 75.2984 96.157 95.0782 77.4619 100.853C58.7669 106.582 38.9801 96.124 33.2033 77.4355'
          fill='transparent'
          id='spinner-5-2'
          stroke={ theme.primary }
          strokeWidth='1'
          strokeMiterlimit='10'
        />
        {
          meterId && (
            <path
              d='M63.9978 62.8394C61.9964 64.8401 61.9964 68.0686 63.9978 70.0693C65.9993 72.07 69.2288 72.07 71.2303 70.0693C73.2317 68.0686 84.6943 49.3801 84.6943 49.3801C84.6943 49.3801 65.9538 60.8387 63.9978 62.8394Z'
              fill='#F7941E'
              id={ meterId }
            />
          )
        }
        <path d='M67 8.91119V22.3705' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M67 111.629V125.089' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M61.9509 9.13855L63.1336 22.5524' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.9119 111.448L72.0945 124.861' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M56.9019 9.77512L59.2672 23.0526' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M74.7783 110.947L77.0981 124.225' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M51.9893 10.8664L55.4464 23.9165' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M78.5536 110.083L82.0562 123.134' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.1222 12.4124L51.7619 25.0533' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M82.2836 108.947L86.8778 121.588' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.4371 14.3677L48.1685 26.5538' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.877 107.446L91.5629 119.678' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M37.9339 16.6867L44.7114 28.3726' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M89.3341 105.627L96.0661 117.313' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M33.6581 19.4149L41.4364 30.4643' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M92.6091 103.536L100.342 114.585' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M29.6553 22.5069L38.3433 32.8288' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M95.7022 101.171L104.39 111.493' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M25.9254 25.9172L35.4321 35.4661' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M98.5679 98.5339L108.12 108.083' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M22.5139 29.6458L32.8394 38.3307' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.206 95.6693L111.532 104.354' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M19.4207 33.6927L30.4741 41.4227' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M103.571 92.5773L114.625 100.307' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M16.6915 37.9669L28.3817 44.6966' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M105.664 89.3034L117.354 96.033' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.3262 42.4686L26.5622 48.1524' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M107.483 85.8476L119.674 91.5769' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M12.4158 47.152L25.0611 51.7446' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.939 82.2554L121.63 86.8934' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M10.8692 51.972L23.924 55.4732' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.122 78.5723L123.176 82.0281' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M9.77755 56.9282L23.0597 59.2481' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.986 74.7527L124.268 77.0726' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M9.09525 61.93L22.5593 63.1127' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M111.486 70.8878L124.905 72.0704' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M8.91329 67.0227H22.3774' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M111.668 67.0227H125.132' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M9.09525 72.0704L22.5593 70.8878' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M111.486 63.1127L124.905 61.93' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M9.77755 77.0726L23.0597 74.7527' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.986 59.2481L124.268 56.9282' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M10.8692 82.0281L23.924 78.5723' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M110.122 55.4732L123.176 51.972' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M12.4158 86.8934L25.0611 82.2554' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M108.939 51.7446L121.63 47.152' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M14.3262 91.5769L26.5622 85.8476' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M107.483 48.1524L119.674 42.4686' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M16.6915 96.033L28.3817 89.3034' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M105.664 44.6966L117.354 37.9669' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M19.4207 100.307L30.4741 92.5773' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M103.571 41.4227L114.625 33.6927' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M22.5139 104.354L32.8394 95.6693' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M101.206 38.3307L111.532 29.6458' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M25.9254 108.083L35.4321 98.5339' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M98.5679 35.4661L108.12 25.9172' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M29.6553 111.493L38.3433 101.171' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M95.7022 32.8288L104.39 22.5069' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M33.6581 114.585L41.4364 103.536' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M92.6091 30.4643L100.342 19.4149' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M37.9339 117.313L44.7114 105.627' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M89.3341 28.3726L96.0661 16.6867' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M42.4371 119.678L48.1685 107.446' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M85.877 26.5538L91.5629 14.3677' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M47.1222 121.588L51.7619 108.947' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M82.2836 25.0533L86.8778 12.4124' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M51.9893 123.134L55.4464 110.083' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M78.5536 23.9165L82.0562 10.8664' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M56.9019 124.225L59.2672 110.947' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M74.7783 23.0526L77.0981 9.77512' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M61.9509 124.861L63.1336 111.448' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path d='M70.9119 22.5524L72.0945 9.13855' stroke={ theme.highlight1 } strokeMiterlimit='10'/>
        <path
          d='M67 131C31.6567 131 3 102.353 3 67.0227'
          fill='transparent'
          id='spinner-5-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <path
          d='M67 3C102.343 3 131 31.6465 131 66.9773C131 87.2572 121.584 105.309 106.846 117.04'
          fill='transparent'
          id='spinner-5-1'
          stroke={ theme.primary }
          strokeWidth='6'
          strokeMiterlimit='10'
        />
      </Container>
    </SvgIcon>
  );
}

export const Spinner5 = withTheme(Spinner5Base);