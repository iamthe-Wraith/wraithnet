import styled from 'styled-components';
import { IThemeProps } from '../../../../styles/themes';

export const Right1Container = styled.div<IThemeProps>`
    .side {
        position: absolute;
        width: 5px;
        height: calc(45% - 40px);

        &.right {
            border-right: ${({theme}) => `1px solid ${theme.primary}`};

            &.inner {
                left: 100%;
                height: calc(20% - 40px);
                border-right: ${({theme}) => `1px solid ${theme.light}`};
            }

            &.outer {
                left: calc(100% + 5px);
            }
        }

        &.upper {
            top: 40px;

            &.inner {
                top: calc(25% + 40px);
                border-top: ${({theme}) => `1px solid ${theme.light}`};

                &:before,
                &:after {
                    content: ' ';
                    position: absolute;
                    left: 0px;
                    width: 5px;
                    height: 1px;
                }

                &:before {
                    bottom: calc(100% + 10px);
                    background: ${({theme}) => `${theme.light}88`};
                }

                &:after {
                    bottom: calc(100% + 20px);
                    background: ${({theme}) => `${theme.light}44`};
                }
            }
        }

        &.lower {
            bottom: 40px;

            &.inner {
                bottom: calc(25% + 40px);
                border-bottom: ${({theme}) => `1px solid ${theme.light}`};

                &:before,
                &:after {
                    content: ' ';
                    position: absolute;
                    left: 0px;
                    width: 5px;
                    height: 1px;
                }

                &:before {
                    top: calc(100% + 10px);
                    background: ${({theme}) => `${theme.light}88`};
                }

                &:after {
                    top: calc(100% + 20px);
                    background: ${({theme}) => `${theme.light}44`};
                }
            }
        }
    }
`
