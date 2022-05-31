import { Palette } from './palette';
import { Text } from './text';

export type Theme = {
  palette: Palette;

  spacing: (n: number) => number;

  shape: {
    borderRadiues: number;
  };

  text: Text;
};

export enum ThemeMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type ThemeContextValues = {
  mode: ThemeMode;
  theme: Theme;
  isLightMode: boolean
};
