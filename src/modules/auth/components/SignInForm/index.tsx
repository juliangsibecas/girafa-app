import React from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { Formik, FormikHelpers } from 'formik';
import { Box, FormikTextInput } from '../../../../components';
import { Button } from '../../../../components/Button';
import { useSignInMutation } from '../../../../api';
import { GraphQLErrors } from '@apollo/client/errors';
import { useAuth } from '../../hooks';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { signIn: authSignIn } = useAuth();
  const [signIn, { loading: isLoading }] = useSignInMutation();
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await signIn({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.signIn) {
        authSignIn(data.signIn);
      }

      helpers.setErrors({
        password: 'El usuario y/o contraseña son incorrectos.',
      });
    } catch (e) {
      const errors = e.graphQLErrors as GraphQLErrors;
      const error = errors[0];

      if (error && error.message === 'VALIDATION_ERROR') {
        helpers.setErrors(error.extensions);
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar iniciar sesión',
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
            />
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            Iniciar Sesión
          </Button>
        </>
      )}
    </Formik>
  );
};
