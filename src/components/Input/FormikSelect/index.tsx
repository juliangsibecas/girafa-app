import { useFormikContext } from 'formik';
import React from 'react';

import { UiKeys } from '../../../ui';
import { Box } from '../../Box';

import { FormikError } from '../FormikError';
import { Select } from '../Select';

type Props = UiKeys & {
  id: string;
  placeholder: string;
  options: Array<{ label: string; value: any }>;
};

export const FormikSelect: React.FC<Props> = ({
  id,
  placeholder,
  options,
  ...props
}) => {
  const { values, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <Box flex flexGrow={1}>
      <Select
        placeholder={placeholder}
        value={value}
        onChange={(newValue) => handleChange(id)(newValue)}
        options={options}
        {...props}
      />
      <FormikError id={id} />
    </Box>
  );
};
