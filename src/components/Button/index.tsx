import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { useStyle, UiKeys } from '../../ui';
import { insertObjectIf } from '../../utils';
import { Text } from '../Text';

type Props = UiKeys &
  TouchableOpacityProps & {
    children: string;

    secondary?: boolean;

    isLoading?: boolean;
  };

export const Button: React.FC<Props> = ({
  secondary,
  children,
  onPress,
  isLoading,
  ...props
}) => {
  const theme = useTheme();

  const type = secondary ? 'secondary' : 'primary';
  const buttonStyle: ViewStyle = {
    ...insertObjectIf(type === 'secondary', {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
    }),
  };

  const style = useStyle(
    {
      flex: true,
      center: true,
      fullWidth: true,
      borderRadius: 1,
      height: 8,
      ...insertObjectIf(type === 'primary', {
        bgColor: theme.palette.primary.main,
      }),
      ...props,
    },
    buttonStyle
  );

  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={isLoading}>
      {isLoading && <ActivityIndicator color={theme.palette.background.main} />}
      {!isLoading && (
        <Text
          type="button"
          color={type === 'primary' ? 'background' : 'primary'}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
