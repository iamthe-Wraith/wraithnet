import { animated } from 'react-spring';
import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const ToasterContainer = styled(animated.div)<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: stretch;
    position: absolute;
    top: 30px;
    right: 20vw;
    z-index: 999;

    .text-container {
        padding: 3px 5px 6px 20px;
    }
`;
