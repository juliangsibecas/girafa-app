import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { useGenerateRecoveryCodeMutation } from '../../../../api';
import { Box, Button, FormikTextInput } from '../../../../components';
import { OnboardingNavigationProp } from '../../../onboarding';

type FormValues = {
  email: string;
};

const initialValues: FormValues = {
  email: '',
};

export const PasswordRecoveryFormStepOne: React.FC = () => {
  const { navigate } =
    useNavigation<OnboardingNavigationProp<'PasswordRecovery'>>();
  const [generateRecoveryCode, { loading: isLoading }] =
    useGenerateRecoveryCodeMutation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await generateRecoveryCode({
        variables: {
          data: {
            email: values.email,
          },
        },
      });

      if (data?.generateRecoveryCode) {
        navigate('PasswordRecovery');
      }

      helpers.setErrors({
        email: 'El correo esta mal bro.',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar generar el codigo',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <>
          <Box flex flexGrow={1}>
            <FormikTextInput
              id="email"
              placeholder="Correo electronico"
              keyboardType="email-address"
              contentType="emailAddress"
              mt={1}
            />
            <FormikTextInput
              id="password"
              placeholder="Contraseña"
              contentType="password"
              mt={1}
              mb={1.5}
            />
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            Enviar codigo
          </Button>
        </>
      )}
    </Formik>
  );
};
