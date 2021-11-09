import styled from 'styled-components';
import { IThemeProps } from '../../../../styles/themes';

const size = 4;

export const Top1Container = styled.div<IThemeProps>`
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;

    .top-center {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        width: 45%;
        height: ${size}px;
        background: ${({theme}) => theme.lightGray};
        transform: translate3d(-50%, 0, 0);

        &:before,
        &:after {
            content: ' ';
            position: absolute;
            top: 0;
            display: block;
            border-top: ${size / 2}px solid transparent;
            border-bottom: ${({theme}) => `${size / 2}px solid ${theme.lightGray}`};
        }

        &:before {
            right: 100%;
            border-left: ${size / 2}px solid transparent;
            border-right: ${({theme}) => `${size / 2}px solid ${theme.lightGray}`};
        }

        &:after {
            left: 100%;
            border-right: ${size / 2}px solid transparent;
            border-left: ${({theme}) => `${size / 2}px solid ${theme.lightGray}`};
        }
    }
`
