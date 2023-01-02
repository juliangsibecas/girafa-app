import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useStyle, UiKeys } from '../../ui';

export interface IBox extends ViewProps, UiKeys {}

export const Box: React.FC<IBox> = ({ children, ...props }) => {
  const style = useStyle(props);

  return (
    <View
      style={{ ...style, ...(props.style as ViewStyle) }}
      pointerEvents={props.pointerEvents}
    >
      {children}
    </View>
  );
};
