import React from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { Formik, FormikHelpers } from 'formik';
import { Box, FormikTextInput } from '../../../../components';
import { Button } from '../../../../components/Button';
import { useSignUpMutation } from '../../../../api';
import { GraphQLErrors } from '@apollo/client/errors';
import { useAuth } from '../../hooks';

type FormValues = {
  fullName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm: React.FC = () => {
  const { signIn } = useAuth();
  const [signUp, { loading: isLoading }] = useSignUpMutation();
  const initialValues: FormValues = {
    fullName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras y espacios.'),
    email: Yup.string().required().email(),
    nickname: Yup.string()
      .required()
      .min(3)
      .max(15)
      .matches(
        /^[a-zA-Z0-9_]{3,15}$/,
        'Solo puede contener letras, numeros y guiones bajos.'
      ),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await signUp({
        variables: {
          data: {
            fullName: values.fullName,
            nickname: values.nickname,
            email: values.email,
            password: values.password,
          },
        },
      });

      signIn(data!.signUp);
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
              id="fullName"
              placeholder="Nombre"
              contentType="name"
              mt={1}
            />
            <FormikTextInput
              id="email"
              placeholder="Correo electronico"
              keyboardType="email-address"
              contentType="emailAddress"
              mt={1}
            />
            <FormikTextInput
              id="nickname"
              placeholder="Nombre de usuario"
              contentType="username"
              mt={1}
            />
            <FormikTextInput
              id="password"
              placeholder="Contraseña"
              contentType="newPassword"
              mt={1}
            />
            <FormikTextInput
              id="confirmPassword"
              placeholder="Confirmar contraseña"
              contentType="newPassword"
              mt={1}
            />
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            Registrar
          </Button>
        </>
      )}
    </Formik>
  );
};
