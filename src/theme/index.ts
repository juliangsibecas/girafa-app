import { createTheming } from '@callstack/react-theme-provider';

import { Theme } from './types';
import { lightPalette } from './palette';
import { text } from './text';

const DEFAULT_SPACING = 8;

const theme: Theme = {
  palette: lightPalette,
  text,
  spacing: (n) => n * DEFAULT_SPACING,
  shape: {
    borderRadiues: 8,
  },
};

export const { ThemeProvider, useTheme } = createTheming(theme);
export { Theme };
