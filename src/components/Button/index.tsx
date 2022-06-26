import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useStyle, UiKeys } from '../../ui';
import { insertObjectIf } from '../../utils';
import { Spinner } from '../Spinner';
import { Text } from '../Text';

type Props = UiKeys &
  TouchableOpacityProps & {
    children: string;
    secondary?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    textProps?: UiKeys;
  };

export const Button: React.FC<Props> = ({
  secondary,
  children,
  onPress,
  isLoading,
  isDisabled,
  textProps,
  ...props
}) => {
  const type = secondary ? 'secondary' : 'primary';
  const buttonStyle: ViewStyle = {
    ...insertObjectIf(type === 'secondary', {
      backgroundColor: 'transparent',
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
        bgColor: 'primary',
      }),
      ...insertObjectIf(type === 'secondary', {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'primary',
      }),
      ...insertObjectIf(Boolean(isDisabled), {
        bgColor: 'disabled',
      }),
      ...props,
    },
    buttonStyle
  );

  const color = type === 'primary' ? 'background' : 'primary';

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <Spinner color={color} />}
      {!isLoading && (
        <Text type="button" color={color} {...textProps}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
