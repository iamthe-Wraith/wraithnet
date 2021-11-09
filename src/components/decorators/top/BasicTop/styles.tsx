import styled from 'styled-components';
import { IThemeProps } from '../../../../styles/themes';

export const BasicTopContainer = styled.div<IThemeProps>`
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;

    .top {
        position: absolute;
        bottom: 100%;
        left: 20px;
        width: calc(100% - 40px);
        height: 1px;
        background: ${({theme}) => theme.primary};

        &.top-1 {
            &:before,
            &:after {
                content: ' ';
                position: absolute;
                width: 20px;
                height: 20px;
                border-top: ${({theme}) => `1px solid ${theme.primary}`};
            }

            &:before {
                right: 100%;
                border-left: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(-45deg);
            }

            &:after {
                left: 100%;
                border-right: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(45deg);
            }
        }

        &.top-2 {
            bottom: calc(100% + 5px);
        }
    }
`;