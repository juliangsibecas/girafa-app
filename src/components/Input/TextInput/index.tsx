import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { useTheme } from '../../../theme';
import { UiKeys, useStyle } from '../../../ui';
import { isIOS } from '../../../utils';

export interface ITextInput
  extends UiKeys,
    Pick<RNTextInputProps, 'onChangeText' | 'onBlur' | 'keyboardType'> {
  placeholder: string;
  value: string;
  contentType?: RNTextInputProps['textContentType'];
  secureText?: boolean;
  lines?: number;
  maxLength?: number;
  isDisabled?: boolean;
}

export const TextInput: React.FC<ITextInput> = ({
  placeholder,
  value,
  keyboardType = 'default',
  contentType = 'none',
  secureText,
  onChangeText,
  onBlur,
  lines,
  maxLength,
  isDisabled,
  ...props
}) => {
  const { theme } = useTheme();

  const isMultiline = Boolean(lines);

  const style = useStyle({
    py: 2,
    px: 2,
    bgColor: 'disabled',
    color: 'text.primary',
    borderRadius: 1,
    height: lines && isIOS ? lines * 3.1 : undefined,
    ...props,
  });

  return (
    <>
      <RNTextInput
        keyboardType={keyboardType}
        secureTextEntry={secureText}
        textContentType={contentType}
        placeholderTextColor={theme.palette.text.secondary}
        style={style}
        placeholder={placeholder}
        autoCapitalize={contentType === 'name' ? 'words' : 'none'}
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
