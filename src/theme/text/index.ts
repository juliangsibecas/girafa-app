import { lightPalette } from '../palette';
import { Font, FontFamily, Text } from './types';

const defaultFont: Font = {
  fontFamily: FontFamily.REGULAR,
  fontSize: 14,
  color: lightPalette.text.primary,
  lineHeight: 16,
};

const createFont = (font: Partial<Font>): Font => ({
  ...defaultFont,
  ...font,
});

export const text: Text = {
  primary: defaultFont,
  secondary: createFont({
    color: lightPalette.text.secondary,
  }),

  h1: createFont({
    fontFamily: FontFamily.BOLD,
    fontSize: 32,
    lineHeight: 34,
    color: '#333333',
  }),
  h2: createFont({
    fontFamily: FontFamily.BOLD,
    fontSize: 24,
    lineHeight: 26,
    color: '#333333',
  }),
  h3: createFont({ fontSize: 32, color: '#333333' }),
  h4: createFont({ fontSize: 32, color: '#333333' }),
  h5: createFont({ fontSize: 32, color: '#333333' }),
  h6: createFont({ fontSize: 32, color: '#333333' }),

  button: createFont({
    fontFamily: FontFamily.SEMIBOLD,
    fontSize: 18,
    lineHeight: 20,
    color: '#FFFFFF',
  }),

  hint: createFont({
    fontFamily: FontFamily.REGULAR,
    fontSize: 10,
    lineHeight: 11,
  }),
};

export { Text };
