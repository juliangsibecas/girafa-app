import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { TouchableOpacity } from 'react-native';
import { Box } from '../../Box';
import { Icon } from '../../Icon';
import { FormikError } from '../FormikError';
import { IFormikTextInput } from '../FormikTextInput';
import { TextInput } from '../TextInput';

interface IFormikPasswordInput extends IFormikTextInput {
  isNewPassword?: boolean;
}

export const FormikPasswordInput: React.FC<IFormikPasswordInput> = ({
  id,
  placeholder,
  isNewPassword,
  ...props
}) => {
  const { values, handleBlur, handleChange } = useFormikContext();
  const [isVisible, setVisible] = useState(false);

  const value = (values as Record<string, string>)[id] ?? '';

  const toggleVisibility = () => setVisible(!isVisible);

  return (
    <Box {...props}>
      <Box
        row
        style={{
          alignItems: 'center',
        }}
      >
        <TextInput
          flex={1}
          placeholder={placeholder}
          value={value}
          contentType={isNewPassword ? 'newPassword' : 'password'}
          onChangeText={handleChange(id)}
          onBlur={handleBlur(id)}
          secureText={!isVisible}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 0 }}
          onPress={toggleVisibility}
        >
          <Box p={2}>
            <Icon name={isVisible ? 'eye-off' : 'eye'} color="text.secondary" />
          </Box>
        </TouchableOpacity>
      </Box>
      <FormikError id={id} />
    </Box>
  );
};
