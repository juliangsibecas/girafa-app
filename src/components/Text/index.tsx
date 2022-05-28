import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { Theme } from '../../theme/types';
import { createStyle, UiKeys } from '../../ui';

interface Props extends UiKeys {
  children: string;

  type: keyof Theme['text'];
}

export const Text: React.FC<Props> = ({ type, children, ...props }) => {
  const { text } = useTheme();
  const style = createStyle(props);

  return <RNText style={{ ...text[type], ...style }}>{children}</RNText>;
};
