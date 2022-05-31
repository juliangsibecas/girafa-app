export enum PaletteMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type Color = {
  main: string;
  light?: string;
  dark?: string;
};

export type PaletteColorCode = `${keyof PaletteColors}.${keyof Color}`;

export type PaletteColors = {
  primary: Color;
  secondary: Color;
  success: Color;
  warning: Color;
  error: Color;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    main: string;
    paper: string;
  };
};

export type Palette = {
  mode: PaletteMode;
} & PaletteColors;
