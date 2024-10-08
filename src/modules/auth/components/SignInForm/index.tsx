import React from 'react';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  FormikPasswordInput,
  FormikTextInput,
  Text,
} from '../../../../components';
import { useResponse, useSignInMutation } from '../../../../api';

import { OnboardingNavigationProp } from '../../../onboarding';

import { useAuth } from '../../hooks';

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const { onFormError } = useResponse();
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
      const { messages } = onFormError(e);

      messages && helpers.setErrors(messages);
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
          <Box flex={1}>
            <FormikTextInput
              id="email"
              placeholder={t('user.email')}
              keyboardType="email-address"
              contentType="emailAddress"
            />
            <FormikPasswordInput
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
              <Box row mt={2}>
                <Text>{t('auth.components.SignIn.forgotPassword')} </Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <Button isLoading={isLoading} onPress={() => submitForm()} mt={4}>
            {t('auth.components.SignIn.signIn')}
          </Button>
        </>
      )}
    </Formik>
  );
};
