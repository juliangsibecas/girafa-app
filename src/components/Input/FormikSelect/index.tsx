import { useFormikContext } from 'formik';
import React from 'react';
import { UiKeys } from '../../../ui';
import { FormikError } from '../FormikError';
import { Select } from '../Select';

type Props = UiKeys & {
  id: string;
  options: Array<{ label: string; value: any }>;
};

export const FormikSelect: React.FC<Props> = ({ id, options, ...props }) => {
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <>
      <Select
        value={value}
        onChange={(newValue) => handleChange(id)(newValue)}
        onBlur={handleBlur(id)}
        options={options}
        {...props}
      />
      <FormikError id={id} />
    </>
  );
};
