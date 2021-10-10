import styled from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const CampaignsListContainer = styled.div<IThemeProps>`
    ${ AbsoluteCenter }
    width: 400px;
    height: 500px;
    padding: 10px 0;

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
            bottom: calc(100% + 10px);
        }
    }

    .bottom {
        position: absolute;
        top: 100%;
        left: 20px;
        width: calc(100% - 40px);
        height: 1px;
        background: ${({theme}) => theme.primary};

        &.bottom-1 {
            &:before,
            &:after {
                content: ' ';
                position: absolute;
                bottom: 0;
                width: 20px;
                height: 20px;
                border-bottom: ${({theme}) => `1px solid ${theme.primary}`};
            }
    
            &:before {
                right: 100%;
                border-left: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(45deg);
            }
    
            &:after {
                left: 100%;
                border-right: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(-45deg);
            }
        }
    
        &.bottom-2 {
            top: calc(100% + 10px);
        }
    }

    .side {
        position: absolute;
        width: 5px;
        height: calc(45% - 40px);

        &.left {
            border-left: ${({theme}) => `1px solid ${theme.primary}`};

            &.inner {
                right: 100%;
                height: calc(20% - 40px);
                border-left: ${({theme}) => `1px solid ${theme.light}`};
            }

            &.outer {
                right: calc(100% + 5px);
            }
        }

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
`;

export const CampaignsContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;