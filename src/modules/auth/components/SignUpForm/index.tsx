import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { GraphQLErrors } from '@apollo/client/errors';

import { Box, FormikTextInput } from '../../../../components';
import { Button } from '../../../../components/Button';
import { useResponse, useSignUpMutation } from '../../../../api';

import { useAuth } from '../../hooks';

type FormValues = {
  fullName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const { onError } = useResponse();
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
      .max(25)
      // TODO
      .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras y espacios.'),
    email: Yup.string().required().email(),
    nickname: Yup.string()
      .required()
      .min(3)
      .max(15)
      // TODO
      .matches(
        /^[a-zA-Z0-9_]{3,15}$/,
        'Solo puede contener letras, numeros y guiones bajos.'
      ),
    password: Yup.string().required().min(4),
    // TODO
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

      if (!data?.signUp) {
        throw Error;
      }

      signIn(data!.signUp);
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;
      const error = errors[0];

      if (error && error.message === 'VALIDATION_ERROR') {
        helpers.setErrors(error.extensions);
        return;
      }

      onError();
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
              placeholder={t('general.name')}
              contentType="name"
            />
            <FormikTextInput
              id="email"
              placeholder={t('user.email')}
              keyboardType="email-address"
              contentType="emailAddress"
              mt={1}
            />
            <FormikTextInput
              id="nickname"
              placeholder={t('user.nickname')}
              contentType="username"
              mt={1}
            />
            <FormikTextInput
              id="password"
              placeholder={t('user.password')}
              contentType="newPassword"
              mt={1}
            />
            <FormikTextInput
              id="confirmPassword"
              placeholder={t('user.confirmPassword')}
              contentType="newPassword"
              mt={1}
            />
          </Box>
          <Button isLoading={isLoading} onPress={() => submitForm()} mt={4}>
            {t('auth.components.SignUp.signUp')}
          </Button>
        </>
      )}
    </Formik>
  );
};
