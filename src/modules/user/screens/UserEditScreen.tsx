import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { GraphQLErrors } from '@apollo/client/errors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  useResponse,
  UserGetByIdDocument,
  useUserEditMutation,
} from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Text,
} from '../../../components';

import { useAuth } from '../../auth';
import { usePictureUpload } from '../../picture';

import { MyProfileStackScreenProps } from '../navigator';
import { UserPicturePicker } from '../comonents';
import { useUser } from '../hooks';

type FormValues = {
  picture?: string;
  fullName: string;
  nickname: string;
};

export const UserEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
  const { userId } = useAuth();
  const { updatePictureVersion } = useUser();
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'UserEdit'>['navigation']>();
  const { params } = useRoute<MyProfileStackScreenProps<'UserEdit'>['route']>();
  const [edit, { loading: isLoading }] = useUserEditMutation({
    refetchQueries: [
      {
        query: UserGetByIdDocument,
        variables: { id: userId },
      },
    ],
  });
  const { uploadUser } = usePictureUpload();

  const initialValues: FormValues = {
    fullName: params.fullname,
    nickname: params.nickname,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required()
      .min(3)
      .max(25)
      // TODO
      .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras y espacios.'),
    nickname: Yup.string()
      .required()
      .min(3)
      .max(15)
      // TODO
      .matches(
        /^[a-zA-Z0-9_]{3,15}$/,
        'Solo puede contener letras, numeros y guiones bajos.'
      ),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await edit({
        variables: {
          data: {
            fullName: values.fullName,
            nickname: values.nickname,
          },
        },
      });

      if (data?.userEdit) {
        onSuccess();

        if (values.picture) {
          await uploadUser(values.picture);
        }

        updatePictureVersion();

        navigate('Profile');

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
    <Container noBottomGradient keyboardDismiss>
      <Text type="h2" textCenter mb={2}>
        {t('user.screens.Edit.title')}
      </Text>
      <Text textCenter mb={6}>
        {t('user.screens.Edit.subtitle')}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex flexGrow={1}>
              <UserPicturePicker id="picture" />
              <Text type="hint" mt={2} mb={0.5} ml={0.5}>
                {t('general.name')}
              </Text>
              <FormikTextInput
                id="fullName"
                placeholder={t('general.name')}
                contentType="name"
              />
              <Text type="hint" mt={2} mb={0.5} ml={0.5}>
                {t('user.nickname')}
              </Text>
              <FormikTextInput
                id="nickname"
                placeholder={t('user.nickname')}
                contentType="username"
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              {t('general.edit')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
