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
  FormikPasswordInput,
  Header,
} from '../../../components';
import { SettingsStackScreenProps } from '../../settings';

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const PasswordChangeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
  const { navigate } =
    useNavigation<SettingsStackScreenProps<'PasswordChange'>['navigation']>();
  const [changePassword, { loading: isLoading }] = useChangePasswordMutation();

  const initialValues: FormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(),
    newPassword: Yup.string().required().min(4),
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

        navigate('Menu');
        return;
      }

      helpers.setErrors({
        currentPassword: t('user.screens.PasswordChange.badCurrentPassword'),
      });
    } catch (e: any) {
      onError();
    }
  };

  return (
    <Container noBottomGradient keyboard>
      <Header title={t('user.screens.PasswordChange.title')} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex={1} mt={6}>
              <FormikPasswordInput
                id="currentPassword"
                placeholder={t('user.screens.PasswordChange.currentPassword')}
                contentType="password"
              />
              <FormikPasswordInput
                id="newPassword"
                placeholder={t('user.screens.PasswordChange.newPassword')}
                contentType="password"
                mt={1}
              />
            </Box>
            <Button isLoading={isLoading} onPress={() => submitForm()} mt={4}>
              {t('user.screens.PasswordChange.changePassword')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
