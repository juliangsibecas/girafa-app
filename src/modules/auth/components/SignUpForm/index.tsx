import * as Yup from 'yup';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import { useNavigation } from '@react-navigation/native';

import {
  Box,
  Button,
  Checkbox,
  FormikTextInput,
  Text,
} from '../../../../components';
import { useResponse, useSignUpMutation } from '../../../../api';

import { useAuth } from '../../hooks';

import { OnboardingNavigationProp } from '../../../onboarding';
import { FontFamily } from '../../../../theme';

type FormValues = {
  fullName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const { onFormError } = useResponse();
  const { signIn } = useAuth();
  const [signUp, { loading: isLoading }] = useSignUpMutation();
  const { navigate } = useNavigation<OnboardingNavigationProp<'SignUp'>>();

  const [isAdultChecked, setAdultChecked] = useState(false);
  const [isTermsChecked, setTermsChecked] = useState(false);

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
      const { messages } = onFormError(e);

      messages && helpers.setErrors(messages);
    }
  };

  const checkAdult = () => setAdultChecked(true);
  const uncheckAdult = () => setAdultChecked(false);

  const checkTerms = () => setTermsChecked(true);
  const uncheckTerms = () => setTermsChecked(false);

  const handleTermsPress = () => navigate('Terms');

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
            <Box flex row mt={3}>
              <Checkbox
                isChecked={isAdultChecked}
                onCheck={checkAdult}
                onUncheck={uncheckAdult}
                small
              />
              <Text ml={1}>{t('auth.screens.SignUp.imAdult')}</Text>
            </Box>
            <Box flex row mt={2}>
              <Checkbox
                isChecked={isTermsChecked}
                onCheck={checkTerms}
                onUncheck={uncheckTerms}
                small
              />
              <Text ml={1}>{t('auth.screens.SignUp.acceptThe')}</Text>
              <TouchableOpacity onPress={handleTermsPress}>
                <Text fontFamily={FontFamily.BOLD}>
                  {t('auth.screens.SignUp.terms')}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Button
            isDisabled={!isAdultChecked || !isTermsChecked}
            isLoading={isLoading}
            onPress={() => submitForm()}
            mt={4}
          >
            {t('auth.components.SignUp.signUp')}
          </Button>
        </>
      )}
    </Formik>
  );
};
