import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { useFormikContext } from 'formik';

import { UiKeys } from '../../../ui';

import { FormikError } from '../FormikError';
import { TextInput } from '../TextInput';

interface Props extends UiKeys {
  id: string;
  placeholder: string;
  keyboardType?: RNTextInputProps['keyboardType'];
  contentType?: RNTextInputProps['textContentType'];
  lines?: number;
  maxLength?: number;
}

export const FormikTextInput: React.FC<Props> = ({
  id,
  placeholder,
  keyboardType = 'default',
  contentType = 'none',
  ...props
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
        {...props}
      />
      <FormikError id={id} />
    </>
  );
};
