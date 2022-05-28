import { lightPalette } from '../palette';
import { Font, FontWeight, Text } from './types';

const defaultFont: Font = {
  fontFamily: 'space-mono',
  fontWeight: FontWeight.REGULAR,
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

  h1: createFont({ fontSize: 32, lineHeight: 34, color: '#333333' }),
  h2: createFont({ fontSize: 32, color: '#333333' }),
  h3: createFont({ fontSize: 32, color: '#333333' }),
  h4: createFont({ fontSize: 32, color: '#333333' }),
  h5: createFont({ fontSize: 32, color: '#333333' }),
  h6: createFont({ fontSize: 32, color: '#333333' }),

  button: createFont({ fontSize: 32, color: '#333333' }),
};

export { Text };
