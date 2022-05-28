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
