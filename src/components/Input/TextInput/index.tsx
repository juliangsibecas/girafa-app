import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTheme } from '../../../theme';
import { UiKeys, useStyle } from '../../../ui';

type Props = UiKeys &
  Pick<RNTextInputProps, 'onChangeText' | 'onBlur' | 'keyboardType'> & {
    placeholder: string;
    value: string;
    contentType?: RNTextInputProps['textContentType'];
  };

export const TextInput: React.FC<Props> = ({
  placeholder,
  value,
  keyboardType = 'default',
  contentType = 'none',
  onChangeText,
  onBlur,
  ...props
}) => {
  const { isLightMode } = useTheme();

  const style = useStyle({
    p: 2,
    bgColor: 'disabled',
    color: isLightMode ? '#4F4F4F' : '#FFFFFF',
    borderRadius: 1,
    ...props,
  });

  return (
    <>
      <RNTextInput
        keyboardType={keyboardType}
        secureTextEntry={['password', 'newPassword'].includes(contentType)}
        textContentType={contentType}
        placeholderTextColor={isLightMode ? '#828282' : '#8096DF'}
        style={style}
        placeholder={placeholder}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </>
  );
};
