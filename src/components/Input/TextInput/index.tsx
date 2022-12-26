import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { useTheme } from '../../../theme';
import { UiKeys, useStyle } from '../../../ui';

export interface ITextInput
  extends UiKeys,
    Pick<RNTextInputProps, 'onChangeText' | 'onBlur' | 'keyboardType'> {
  placeholder: string;
  value: string;
  contentType?: RNTextInputProps['textContentType'];
  lines?: number;
  maxLength?: number;
  isDisabled?: boolean;
}

export const TextInput: React.FC<ITextInput> = ({
  placeholder,
  value,
  keyboardType = 'default',
  contentType = 'none',
  onChangeText,
  onBlur,
  lines,
  maxLength,
  isDisabled,
  ...props
}) => {
  const { theme } = useTheme();

  const style = useStyle({
    py: 1.3,
    px: 2,
    bgColor: 'disabled',
    color: 'text.primary',
    borderRadius: 1,
    ...props,
  });

  const isMultiline = Boolean(lines);

  return (
    <>
      <RNTextInput
        keyboardType={keyboardType}
        secureTextEntry={['password', 'newPassword'].includes(contentType)}
        textContentType={contentType}
        placeholderTextColor={theme.palette.text.secondary}
        style={style}
        placeholder={placeholder}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={isMultiline}
        numberOfLines={lines}
        textAlignVertical={isMultiline ? 'top' : 'center'}
        maxLength={maxLength}
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
      />
    </>
  );
};
