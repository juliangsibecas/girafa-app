import { ErrorMessage, useFormikContext } from 'formik';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { ThemeMode, useTheme } from '../../../theme';
import { UiKeys, useStyle } from '../../../ui';
import { Text } from '../../Text';

interface Props extends UiKeys {
  id: string;
  placeholder: string;
  keyboardType?: RNTextInputProps['keyboardType'];
  contentType?: RNTextInputProps['textContentType'];
}

export const TextInput: React.FC<Props> = ({
  id,
  placeholder,
  keyboardType = 'default',
  contentType = 'none',
  ...props
}) => {
  const { isLightMode } = useTheme();
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  const style = useStyle({
    p: 2,
    bgColor: isLightMode ? '#F2F2F2' : '#2C3966',
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
        onChangeText={handleChange(id)}
        onBlur={handleBlur(id)}
      />
      <ErrorMessage
        name={id}
        render={(err) => (
          <Text type="hint" color="#ff0000" mt={0.5} ml={1}>
            {err}
          </Text>
        )}
      />
    </>
  );
};
