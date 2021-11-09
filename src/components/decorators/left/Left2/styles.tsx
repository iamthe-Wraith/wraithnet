import styled from 'styled-components';
import { IThemeProps } from '../../../../styles/themes';

export const Left2Container = styled.div<IThemeProps>`
    position: absolute;
    top: 5%;
    right: calc(100% + 3px);
    width: 1px;
    height: 90%;
    background: ${({theme}) => theme.primary};

    .trapezoid {
        position: absolute;
        right: calc(100% + 2px);
        width: 4px;
        height: 25%;
        background: ${({theme}) => theme.lightGray};

        &.upper {
            bottom: calc(50% + 30px);
        }

        &.lower {
            top: calc(50% + 30px);
        }

        &:before,
        &:after {
            content: ' ';
            position: absolute;
            left: 0;
            display: block;
            border-right: ${({theme}) => `2px solid ${theme.lightGray}`};
            border-left: 2px solid transparent;
        }

        &:before {
            bottom: 100%;
            border-top: 2px solid transparent;
            border-bottom: ${({theme}) => `2px solid ${theme.lightGray}`};
        }

        &:after {
            top: 100%;
            border-top: ${({theme}) => `2px solid ${theme.lightGray}`};
            border-bottom: 2px solid transparent;
        }
    }

    .center {
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        &.outer {
            right: 10px;
            width: 4px;
            height: 20px;
            background: ${({theme}) => theme.lightGray};

            &:before,
            &:after {
                content: ' ';
                position: absolute;
                left: 0;
                display: block;
                border-right: 2px solid transparent;
                border-left: ${({theme}) => `2px solid ${theme.lightGray}`};
            }
    
            &:before {
                bottom: 100%;
                border-top: 2px solid transparent;
                border-bottom: ${({theme}) => `2px solid ${theme.lightGray}`};
            }
    
            &:after {
                top: 100%;
                border-top: ${({theme}) => `2px solid ${theme.lightGray}`};
                border-bottom: 2px solid transparent;
            }
        }

        &.inner {
            left: calc(100% + 2px);
            width: 4px;
            height: 45%;
            background: ${({theme}) => theme.primaryDark};

            &:before,
            &:after {
                content: ' ';
                position: absolute;
                left: 0;
                display: block;
                border-right: 2px solid transparent;
                border-left: ${({theme}) => `2px solid ${theme.primaryDark}`};
            }
    
            &:before {
                bottom: 100%;
                border-top: 2px solid transparent;
                border-bottom: ${({theme}) => `2px solid ${theme.primaryDark}`};
            }
    
            &:after {
                top: 100%;
                border-top: ${({theme}) => `2px solid ${theme.primaryDark}`};
                border-bottom: 2px solid transparent;
            }
        }
    }
`
