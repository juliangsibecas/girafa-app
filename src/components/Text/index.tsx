import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { Theme } from '../../theme/types';
import { useStyle, UiKeys } from '../../ui';

interface Props extends UiKeys {
  type?: keyof Theme['text'];
}

export const Text: React.FC<Props> = ({
  type = 'primary',
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const style = useStyle(props, theme.text[type]);

  return <RNText style={style}>{children as string}</RNText>;
};
