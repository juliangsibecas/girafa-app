import { GraphQLErrors } from '@apollo/client/errors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useGenerateRecoveryCodeMutation, useResponse } from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Header,
  Text,
} from '../../../components';

import {
  OnboardingNavigationProp,
  OnboardingRouteProp,
} from '../../onboarding';

type FormValues = {
  email: string;
};

export const CodeGenerationScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onError } = useResponse();
  const { params } = useRoute<OnboardingRouteProp<'CodeGeneration'>>();
  const { navigate } =
    useNavigation<OnboardingNavigationProp<'CodeGeneration'>>();
  const [generateRecoveryCode, { loading: isLoading }] =
    useGenerateRecoveryCodeMutation();

  const initialValues: FormValues = {
    email: params.email ?? '',
  };

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
        navigate('PasswordRecovery', { email: values.email });
        return;
      }
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;

      if (errors && errors.length) {
        const error = errors[0];

        if (error && error.message === 'VALIDATION_ERROR') {
          helpers.setErrors({
            email: t('auth.screens.CodeGeneration.badEmail'),
          });

          return;
        }

        onError();
      }
    }
  };

  return (
    <Container noBottomTab keyboardDismiss>
      <Header
        title={t('auth.screens.CodeGeneration.title')}
        subtitle={t('auth.screens.CodeGeneration.subtitle')}
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
                id="email"
                placeholder={t('user.email')}
                keyboardType="email-address"
                contentType="emailAddress"
                mt={1}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              {t('auth.screens.CodeGeneration.sendCode')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
