/**
 * ONLY USE HEX VALUES AND ALWAYS USE FORMAT: #XXXXXX
 *
 * there are transparencies calculated throughout app that will break if
 * any other color value type is used, or if format: #XXX is used.
 */

export interface ITheme {
    dark: string;
    darkerGray: string;
    darkestGray: string;
    darkGray: string;
    error: string;
    gray: string;
    light: string;
    lighterGray: string;
    lightestGray: string;
    lightGray: string;
    highlight1: string;
    highlight2: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
}

export interface IThemeProps {
    theme?: ITheme;
}

const Base = {
    dark: '#000000',
    darkerGray: '#282828',
    darkestGray: '#141414',
    darkGray: '#505050',
    error: '#e3350d',
    gray: '#787878',
    light: '#ededed',
    lighterGray: '#bebebe',
    lightestGray: '#e6e6e6',
    lightGray: '#a0a0a0',
};

export const Breeze: ITheme = {
    ...Base,
    highlight1: '#CF7100',
    highlight2: '#A95B00',
    primary: '#00b4fa',
    primaryDark: '#005577',
    primaryLight: '#49c9fc',
};

export const PinkBerry: ITheme = {
    ...Base,
    highlight1: '#008080',
    highlight2: '#005959',
    primary: '#CC5490',
    primaryDark: '#7A3256',
    primaryLight: '#FF87C3',
};

export const PoisonIvy: ITheme = {
    ...Base,
    highlight1: '#ff1d8e',
    highlight2: '#ff6ab4',
    primary: '#1dff1d',
    primaryDark: '#00d000',
    primaryLight: '#6aff6a',
};

export const DangerousIce: ITheme = {
    ...Base,
    highlight1: '#00ffff',
    highlight2: '#00b3b3',
    primary: '#cc0000',
    primaryDark: '#800000',
    primaryLight: '#ff0000',
};

export const PlumpCandy: ITheme = {
    ...Base,
    highlight1: '#FF87C3',
    highlight2: '#ff3b9d',
    primary: '#6b0188',
    primaryDark: '#430155',
    primaryLight: '#7f02a1',
};

export const Villain: ITheme = {
    ...Base,
    highlight1: '#91fc05',
    highlight2: '#74cc02',
    primary: '#0522fc',
    primaryDark: '#0217b2',
    primaryLight: '#5165fd',
};

export const AuroraBorealis: ITheme = {
    ...Base,
    highlight1: '#91fc05',
    highlight2: '#74cc02',
    primary: '#bf0b65',
    primaryDark: '#77073f',
    primaryLight: '#f2248b',
};
