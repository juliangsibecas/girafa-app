import { Palette } from '../palette';
import { Font, FontFamily, Text } from './types';

export const text = (palette: Palette) => {
  const defaultFont: Font = {
    fontFamily: FontFamily.REGULAR,
    fontSize: 14,
    color: palette.text.primary,
    lineHeight: 16,
  };

  const createFont = (font: Partial<Font>): Font => ({
    ...defaultFont,
    ...font,
  });

  return {
    primary: defaultFont,
    secondary: createFont({
      color: palette.text.secondary,
    }),

    h1: createFont({
      fontFamily: FontFamily.BOLD,
      fontSize: 32,
      lineHeight: 34,
    }),
    h2: createFont({
      fontFamily: FontFamily.BOLD,
      fontSize: 24,
      lineHeight: 26,
    }),
    h3: createFont({
      fontFamily: FontFamily.BOLD,
      fontSize: 20,
      lineHeight: 22,
    }),
    h4: createFont({
      fontFamily: FontFamily.MEDIUM,
      fontSize: 18,
      lineHeight: 20,
    }),
    h5: createFont({ fontSize: 32 }),
    h6: createFont({ fontSize: 32 }),

    button: createFont({
      fontFamily: FontFamily.SEMIBOLD,
      fontSize: 18,
      lineHeight: 20,
    }),

    hint: createFont({
      fontFamily: FontFamily.REGULAR,
      fontSize: 10,
      lineHeight: 11,
    }),
  };
};

export { FontFamily, Text };
