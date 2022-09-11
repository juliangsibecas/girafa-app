import React from 'react';
import { ErrorMessage } from 'formik';
import { Text } from '../../Text';
import { useTheme } from '../../../theme';

type Props = {
  id: string;
};
export const FormikError: React.FC<Props> = ({ id }) => {
  const { theme } = useTheme();

  return (
    <ErrorMessage
      name={id}
      render={(e) => (
        <Text type="hint" color={theme.palette.error.main} mt={0.5} ml={1}>
          {e}
        </Text>
      )}
    />
  );
};
