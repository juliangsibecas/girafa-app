export type Color = {
  main: string;
  light?: string;
  dark?: string;
};

export type PaletteColorCode = `${keyof Palette}.${keyof Color}`;

export type Palette = {
  common: {
    white: string;
  };
  primary: Color;
  secondary: Color;
  success: Color;
  warning: Color;
  error: Color;
  disabled: Color;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: Color;
};
