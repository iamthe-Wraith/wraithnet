import styled from 'styled-components';
import { IThemeProps } from '../../../../styles/themes';

const size = 4;

export const Bottom1Container = styled.div<IThemeProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;

    .bottom-center {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        width: 45%;
        height: ${size}px;
        background: ${({theme}) => theme.lightGray};
        transform: translate3d(-50%, 0, 0);

        &:before,
        &:after {
            content: ' ';
            position: absolute;
            bottom: 0;
            display: block;
            border-bottom: ${size / 2}px solid transparent;
            border-top: ${({theme}) => `${size / 2}px solid ${theme.lightGray}`};
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
