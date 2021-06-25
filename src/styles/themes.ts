/**
 * ONLY USE HEX VALUES AND ALWAYS USE FORMAT: #XXXXXX
 *
 * there are transparencies calculated throughout app that will break if
 * any other color value type is used, or if format: #XXX is used.
 */

 const Base = {
  dark: '#000000',
  darkerGray: '#282828',
  darkestGray: '#141414',
  darkGray: '#505050',
  error: '#e3350d',
  gray: '#787878',
  light: '#ffffff',
  lighterGray: '#bebebe',
  lightestGray: '#e6e6e6',
  lightGray: '#a0a0a0',
};

export const Breeze = {
  ...Base,
  highlight1: '#CF7100',
  highlight2: '#A95B00',
  primary: '#72B0A6',
  primaryDark: '#3B8295',
  primaryLight: '#84CABF',
};

export const PinkBerry = {
  ...Base,
  highlight1: '#008080',
  highlight2: '#005959',
  primary: '#CC5490',
  primaryDark: '#7A3256',
  primaryLight: '#FF87C3',
}