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

export enum RawThemeMode {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum ThemeMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type ThemeContextValues = {
  rawMode: RawThemeMode;
  mode: ThemeMode;
  theme: Theme;
  isLightMode: boolean;
  changeThemeMode: (mode: RawThemeMode | ThemeMode) => void;
};
