import { Theme, ThemeMode } from './types';
import { darkPalette, lightPalette } from './palette';
import { text } from './text';

const DEFAULT_SPACING = 8;

export const theme = (mode: ThemeMode): Theme => {
  const palette = mode === ThemeMode.LIGHT ? lightPalette : darkPalette;

  return {
    palette,
    text: text(palette),
    spacing: (n) => n * DEFAULT_SPACING,
    shape: {
      borderRadiues: 8,
    },
  };
};

export { Theme, ThemeMode };
export { FontFamily } from './text';
export { ThemeProvider } from './provider';
export { useTheme } from './hooks';
