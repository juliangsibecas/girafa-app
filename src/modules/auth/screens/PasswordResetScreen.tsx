import { GraphQLErrors } from '@apollo/client/errors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
  useRecoverPasswordMutation,
  useResponse,
  useSignInMutation,
} from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Header,
} from '../../../components';

import {
  OnboardingNavigationProp,
  OnboardingRouteProp,
} from '../../onboarding';

import { useAuth } from '../hooks';

type FormValues = {
  code: string;
  password: string;
  confirmPassword: string;
};

export const PasswordResetScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onError } = useResponse();
  const { signIn } = useAuth();
  const { params } = useRoute<OnboardingRouteProp<'CodeGeneration'>>();
  const { navigate } =
    useNavigation<OnboardingNavigationProp<'CodeGeneration'>>();
  const [recoverPassword, { loading: isGenerationLoading }] =
    useRecoverPasswordMutation();
  const [signInMutation, { loading: isSignInLoading }] = useSignInMutation();

  const initialValues: FormValues = {
    code: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(),
    password: Yup.string().required().min(4),
    confirmPassword: Yup.string()
      .required()
      // TODO
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await recoverPassword({
        variables: {
          data: {
            email: params.email!,
            password: values.password,
            code: values.code,
          },
        },
      });

      if (data?.recoverPassword) {
        const res = await signInMutation({
          variables: {
            data: {
              email: params.email!,
              password: values.password,
            },
          },
        });

        if (res.errors || !res.data) {
          onError();
          navigate('Onboarding');
          return;
        }

        signIn(res.data.signIn);
        return;
      }
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;

      if (errors && errors.length) {
        const error = errors[0];

        if (error && error.message === 'VALIDATION_ERROR') {
          helpers.setErrors({ code: t('auth.screens.PasswordReset.badCode') });
          return;
        }
      }

      onError();
    }
  };

  return (
    <Container noBottomTab keyboard>
      <Header
        title={t('auth.screens.PasswordReset.title')}
        subtitle={t('auth.screens.PasswordReset.subtitle')}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex flexGrow={1}>
              <FormikTextInput
                id="code"
                placeholder={t('auth.code')}
                keyboardType="numeric"
                maxLength={4}
                mb={2}
              />
              <FormikTextInput
                id="password"
                placeholder={t('user.newPassword')}
                contentType="password"
                mt={1}
              />
              <FormikTextInput
                id="confirmPassword"
                placeholder={t('user.confirmPassword')}
                contentType="password"
                mt={1}
              />
            </Box>
            <Button
              isLoading={isGenerationLoading || isSignInLoading}
              onPress={() => submitForm()}
              mt={4}
            >
              {t('auth.screens.PasswordReset.changePassword')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
