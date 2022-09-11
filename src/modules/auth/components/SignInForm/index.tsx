import React from 'react';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GraphQLErrors } from '@apollo/client/errors';
import { Formik, FormikHelpers } from 'formik';

import { Box, Button, FormikTextInput, Text } from '../../../../components';
import { useResponse, useSignInMutation } from '../../../../api';

import { useAuth } from '../../hooks';
import { FontFamily } from '../../../../theme';
import { OnboardingNavigationProp } from '../../../onboarding';
import { useTranslation } from 'react-i18next';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const { onError } = useResponse();
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
        return;
      }

      throw Error();
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;

      if (errors && errors.length) {
        const error = errors[0];

        if (error && error.message === 'VALIDATION_ERROR') {
          helpers.setErrors(error.extensions);
          return;
        }
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
      {({ submitForm, values }) => (
        <>
          <Box flex flexGrow={1}>
            <FormikTextInput
              id="email"
              placeholder={t('user.email')}
              keyboardType="email-address"
              contentType="emailAddress"
            />
            <FormikTextInput
              id="password"
              placeholder={t('user.password')}
              contentType="password"
              mt={1}
            />
            <TouchableOpacity
              onPress={() =>
                navigate('CodeGeneration', { email: values.email })
              }
            >
              <Box flex row mt={1.5}>
                <Text>{t('auth.components.SignIn.forgotPassword')} </Text>
                <Text fontFamily={FontFamily.BOLD}>aca</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            {t('auth.components.SignIn.signIn')}
          </Button>
        </>
      )}
    </Formik>
  );
};
