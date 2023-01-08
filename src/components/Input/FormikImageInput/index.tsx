import React from 'react';
import { useFormikContext } from 'formik';

import { UiKeys } from '../../../ui';

import { FormikError } from '../FormikError';
import { ImageInput } from '../ImageInput';

interface Props extends UiKeys {
  id: string;
}

export const FormikImageInput: React.FC<Props> = ({ id, ...props }) => {
  const { values, handleBlur, handleChange } = useFormikContext();
  const value = (values as Record<string, string>)[id] ?? '';

  return (
    <>
      <ImageInput
        value={value}
        onChange={handleChange(id)}
        onBlur={handleBlur(id)}
        {...props}
      />
      <FormikError id={id} />
    </>
  );
};
