import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useStyle, UiKeys } from '../../ui';

type Props = ViewProps & UiKeys;

export const Box: React.FC<Props> = ({ children, ...props }) => {
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
