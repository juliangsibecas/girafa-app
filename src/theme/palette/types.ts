export type Color = {
  main: string;
  light?: string;
  dark?: string;
};

export type PaletteColorCode = `${keyof Palette}.${keyof Color}`;

export type Palette = {
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
