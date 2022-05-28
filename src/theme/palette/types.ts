export enum PaletteMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

type Color = {
  main: string;
  light?: string;
  dark?: string;
};

export type Palette = {
  mode: PaletteMode;
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
    paper: string;
    default: string;
  };
};
