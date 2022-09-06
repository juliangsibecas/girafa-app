import React from 'react';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GraphQLErrors } from '@apollo/client/errors';
import { Formik, FormikHelpers } from 'formik';

import { Box, Button, FormikTextInput, Text } from '../../../../components';
import { useSignInMutation } from '../../../../api';
import { useAuth } from '../../hooks';
import { FontFamily } from '../../../../theme';
import { OnboardingNavigationProp } from '../../../onboarding';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { navigate } = useNavigation<OnboardingNavigationProp<'SignIn'>>();

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
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;

      if (errors && errors.length) {
        const error = errors[0];

        if (error && error.message === 'VALIDATION_ERROR') {
          helpers.setErrors(error.extensions);
          return;
        }
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
      {({ submitForm, values }) => (
        <>
          <Box flex flexGrow={1}>
            <FormikTextInput
              id="email"
              placeholder="Correo electronico"
              keyboardType="email-address"
              contentType="emailAddress"
            />
            <FormikTextInput
              id="password"
              placeholder="Contraseña"
              contentType="password"
              mt={1}
            />
            <TouchableOpacity
              onPress={() =>
                navigate('CodeGeneration', { email: values.email })
              }
            >
              <Box flex row mt={1.5}>
                <Text>Te olvidaste tu clave? </Text>
                <Text fontFamily={FontFamily.BOLD}>aca</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            Iniciar Sesión
          </Button>
        </>
      )}
    </Formik>
  );
};
