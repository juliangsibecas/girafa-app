import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useChangePasswordMutation, useResponse } from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Text,
} from '../../../components';

import { MyProfileStackScreenProps } from '../navigator';

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const PasswordChangeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'PasswordChange'>['navigation']>();
  const [changePassword, { loading: isLoading }] = useChangePasswordMutation();

  const initialValues: FormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(),
    newPassword: Yup.string().required().min(4),
    // TODO
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden.'),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await changePassword({
        variables: {
          data: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      });

      if (data?.changePassword) {
        onSuccess();

        navigate('Settings');
        return;
      }

      // TODO
      helpers.setErrors({
        currentPassword: 'La pw esta mal bro.',
      });
    } catch (e: any) {
      onError();
    }
  };

  return (
    <Container noBottomGradient keyboardDismiss>
      <Text type="h2" textCenter mb={2}>
        {t('user.screens.PasswordChange.title')}
      </Text>
      <Text textCenter mb={4}>
        {t('user.screens.PasswordChange.subtitle')}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex flexGrow={1}>
              <FormikTextInput
                id="currentPassword"
                placeholder={t('user.screens.PasswordChange.currentPassword')}
                contentType="password"
              />
              <FormikTextInput
                id="newPassword"
                placeholder={t('user.screens.PasswordChange.newPassword')}
                contentType="password"
                mt={4}
              />
              <FormikTextInput
                id="confirmPassword"
                placeholder={t('general.confirmPassword')}
                contentType="password"
                mt={1}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              {t('user.screens.PasswordChange.changePassword')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
