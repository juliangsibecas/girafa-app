import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useStyle, UiKeys } from '../../ui';
import { insertObjectIf } from '../../utils';
import { Spinner } from '../Spinner';
import { Text } from '../Text';

export interface IButton extends UiKeys, TouchableOpacityProps {
  children: ReactNode;
  secondary?: boolean;
  small?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  showAsDisabled?: boolean;
  textProps?: UiKeys;
}

export const Button: React.FC<IButton> = ({
  secondary,
  small,
  children,
  onPress,
  isLoading,
  isDisabled,
  showAsDisabled,
  textProps,
  ...props
}) => {
  const type = secondary ? 'secondary' : 'primary';
  const buttonStyle: ViewStyle = {
    ...insertObjectIf(type === 'secondary', {
      backgroundColor: 'transparent',
    }),
  };

  const isDisabledStyle = Boolean(isDisabled || showAsDisabled);

  const style = useStyle(
    {
      center: true,
      fullWidth: true,
      borderRadius: 1,
      height: small ? 5 : 8,
      ...insertObjectIf(type === 'primary', {
        bgColor: 'primary',
      }),
      ...insertObjectIf(!isDisabledStyle && type === 'secondary', {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'primary',
      }),
      ...insertObjectIf(isDisabledStyle, {
        bgColor: 'disabled',
      }),
      ...props,
    },
    buttonStyle
  );

  const color =
    isDisabledStyle || type === 'primary' ? 'background' : 'primary';

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <Spinner color={color} />}
      {!isLoading &&
        (typeof children === 'string' ? (
          <Text
            type="button"
            color={color}
            fontSize={small ? 14 : undefined}
            {...textProps}
          >
            {children}
          </Text>
        ) : (
          children
        ))}
    </TouchableOpacity>
  );
};
