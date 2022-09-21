import { useFormikContext } from 'formik';
import React from 'react';

import { UiKeys } from '../../../ui';

import { DateInput } from '../DateInput';
import { FormikError } from '../FormikError';

type Props = UiKeys & {
  id: string;
  placeholder: string;
};

export const FormikDateInput: React.FC<Props> = ({
  id,
  placeholder,
  ...props
}) => {
  const { values, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <>
      <DateInput
        placeholder={placeholder}
        value={value}
        onChange={(newValue) => handleChange(id)(newValue)}
        {...props}
      />
      <FormikError id={id} />
    </>
  );
};
