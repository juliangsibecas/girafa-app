import { ErrorMessage, useFormikContext } from 'formik';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
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
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  const style = useStyle({
    p: 2,
    bgColor: '#F2F2F2',
    color: '#4F4F4F',
    borderRadius: 1,
    ...props,
  });

  return (
    <>
      <RNTextInput
        keyboardType={keyboardType}
        secureTextEntry={['password', 'newPassword'].includes(contentType)}
        textContentType={contentType}
        placeholderTextColor="#828282"
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
