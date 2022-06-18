import { ErrorMessage, useFormikContext } from 'formik';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { UiKeys } from '../../../ui';
import { Text } from '../../Text';
import { TextInput } from '../TextInput';

interface Props extends UiKeys {
  id: string;
  placeholder: string;
  keyboardType?: RNTextInputProps['keyboardType'];
  contentType?: RNTextInputProps['textContentType'];
}

export const FormikTextInput: React.FC<Props> = ({
  id,
  placeholder,
  keyboardType = 'default',
  contentType = 'none',
}) => {
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        contentType={contentType}
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
