import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const headerHeight = 80;

export const Center = styled.div`
    background: ${({theme}: IThemeProps) => theme.primaryDark}50;
    clip-path: polygon(calc(0% - 1px) 0%, calc(100% + 1px) 0%, calc(100% + 1px) ${headerHeight / 2}px, calc(100% - ${headerHeight / 2}px) 100%, ${headerHeight / 2}px 100%, calc(0% - 1px) calc(100% - ${headerHeight / 2}px));
    margin: 0;
    padding: 20px 50px 0;
    position: relative;
`;

export const Container = styled.div`
    display: flex;
    height: ${headerHeight}px;
    justify-content: center;
`;

export const DateContainer = styled(PrimaryFont)`
    color: ${({theme}: IThemeProps) => theme.primaryDark};
`;

export const Side = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;

    & > * {
        min-height: ${headerHeight / 2}px;
        width: 100%;
    }

    &.left {
        & > :first-child {
            background: ${({theme}: IThemeProps) => `linear-gradient(to right, transparent, ${ theme.primaryDark}50)`};
        }

        & > :last-child {
            display: flex;
            justify-content: space-between;
            padding-right: 20px;

            &:before {
                background: ${({theme}: IThemeProps) => `linear-gradient(to right, transparent, ${theme.highlight1})`};
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 1px, 0% 1px);
                transform: skew(45deg);
            }

            &:after {
                background: ${({theme}: IThemeProps) => `linear-gradient(to right, ${theme.highlight1}, transparent)`};
                left: calc(100% + 19px);
            }
        }
    }

    &.right {
        align-items: flex-end;

        & > :first-child {
            background: ${({theme}: IThemeProps) => `linear-gradient(to right, ${ theme.primaryDark}50, transparent)`};
        }

        & > :last-child {
            padding-left: 40px;

            &:before {
                background: ${({theme}: IThemeProps) => `linear-gradient(to right, ${theme.highlight1}, transparent)`};
                clip-path: polygon(0% 0%, 100% 0%, 100% 1px, 2px 1px, 2px 100%, 0% 100%);
                transform: skew(-45deg);
            }

            &:after {
                background: ${({theme}: IThemeProps) => `linear-gradient(to right, transparent, ${theme.highlight1})`};
                right: calc(100% + 19px);
            }
        }
    }

    & > :last-child {
        align-items: center;
        display: flex;
        margin-top: 10px;
        padding-top: 10px;
        position: relative;
        width: 96%;

        &:before,
        &:after {
            content: ' ';
            position: absolute;
        }

        &:before {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &:after {
            bottom: 0;
            width: 40px;
            height: 1px;
        }
    }

    .icon-link {
        line-height: 0;

        &:hover {
            cursor: default;

            svg {
                fill: ${({theme}: IThemeProps) => theme.primary};
            }
        }

        &.selected {
            svg {
                fill: ${({theme}: IThemeProps) => theme.primary};
            }
        }

        svg {
            fill: ${({theme}: IThemeProps) => theme.light};
            transition: .15s ease-in-out;
        }
    }
`;

export const UserId = styled.div`
    color: ${({theme}: IThemeProps) => theme.darkGray};
    font-size: 12px;
    padding-left: 20px;
`;

export const Username = styled(PrimaryFont)`
    color: ${({theme}: IThemeProps) => theme.primary};
    font-size: 30px;
    position: relative;
    z-index: 1;
`;