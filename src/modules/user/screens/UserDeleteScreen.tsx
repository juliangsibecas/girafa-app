import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { GraphQLErrors } from '@apollo/client/errors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useResponse, useUserDeleteMutation } from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Header,
} from '../../../components';

import { SettingsStackScreenProps } from '../../settings';
import { useAuth } from '../../auth';

type FormValues = {
  password: string;
};

export const UserDeleteScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
  const { navigate } =
    useNavigation<SettingsStackScreenProps<'UserDelete'>['navigation']>();
  const [edit, { loading: isLoading }] = useUserDeleteMutation();
  const { signOut } = useAuth();

  const initialValues: FormValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await edit({
        variables: {
          data: {
            password: values.password,
          },
        },
      });

      if (data?.userDelete) {
        onSuccess();

        signOut();

        return;
      }

      throw Error();
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
    <Container noBottomGradient keyboard>
      <Header
        title={t('user.screens.Delete.title')}
        subtitle={t('user.screens.Delete.subtitle')}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex flexGrow={1} flexShrink={1} pt={3} pb={5}>
              <FormikTextInput
                id="password"
                placeholder={t('user.password')}
                contentType="password"
              />
            </Box>
            <Button
              isLoading={isLoading}
              onPress={submitForm}
              mt={4}
              bgColor="error"
            >
              {t('general.delete')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
