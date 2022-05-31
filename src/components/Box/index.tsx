import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useStyle, UiKeys } from '../../ui';

interface Props extends UiKeys {
  style?: ViewStyle;
}

export const Box: React.FC<Props> = ({ children, ...props }) => {
  const style = useStyle(props);

  return <View style={{ ...style, ...props.style }}>{children}</View>;
};
