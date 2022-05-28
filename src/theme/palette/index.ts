import { Palette, PaletteMode } from './types';

export * from './types';

export const lightPalette: Palette = {
  mode: PaletteMode.LIGHT,
  primary: {
    main: '#9070ED',
  },
  secondary: {
    main: '#000000',
  },
  success: {
    main: '#00FF00',
  },
  warning: {
    main: '#FFFF00',
  },
  error: {
    main: '#FF0000',
  },
  text: {
    primary: '#4F4F4F',
    secondary: '#B2B2B2',
    disabled: '#B2B2B2',
  },
  background: {
    default: '#000000',
    paper: '#000000',
  },
};
