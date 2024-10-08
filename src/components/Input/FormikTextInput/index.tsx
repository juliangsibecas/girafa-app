import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { useFormikContext } from 'formik';

import { UiKeys } from '../../../ui';

import { FormikError } from '../FormikError';
import { TextInput } from '../TextInput';
import { Box } from '../../Box';

export interface IFormikTextInput extends UiKeys {
  id: string;
  placeholder: string;
  keyboardType?: RNTextInputProps['keyboardType'];
  contentType?: RNTextInputProps['textContentType'];
  lines?: number;
  maxLength?: number;
}

export const FormikTextInput: React.FC<IFormikTextInput> = ({
  id,
  placeholder,
  keyboardType = 'default',
  contentType = 'none',
  lines,
  maxLength,
  ...props
}) => {
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <Box {...props}>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        contentType={contentType}
        onChangeText={handleChange(id)}
        onBlur={handleBlur(id)}
        lines={lines}
        maxLength={maxLength}
      />
      <FormikError id={id} />
    </Box>
  );
};
