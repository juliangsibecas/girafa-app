import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  useResponse,
  UserGetDocument,
  useUserEditMutation,
} from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Header,
  Text,
} from '../../../components';
import { Maybe } from '../../../types';

import { useAuth } from '../../auth';
import { usePictureUpload } from '../../picture';

import { MyProfileStackScreenProps } from '../navigator';
import { UserBannerPicker, UserPicturePicker } from '../components';

type FormValues = {
  pictureUri?: string;
  bannerUri?: string;
  fullName: string;
  nickname: string;
  instagramUsername?: Maybe<string>;
};

export const UserEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onSuccess, onFormError } = useResponse();
  const { userId } = useAuth();
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'UserEdit'>['navigation']>();
  const { params } = useRoute<MyProfileStackScreenProps<'UserEdit'>['route']>();
  const [isLoading, setLoading] = useState(false);
  const [edit] = useUserEditMutation({
    refetchQueries: [
      {
        query: UserGetDocument,
        variables: { data: { id: userId } },
      },
    ],
  });
  const { uploadUserPicture, uploadUserBanner } = usePictureUpload();

  const initialValues: FormValues = {
    fullName: params.fullName,
    nickname: params.nickname,
    instagramUsername: params.instagramUsername,
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
        'Solo puede contener letras, números y guiones bajos.'
      ),
    instagramUsername: Yup.string().nullable().max(30),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);
      if (values.pictureUri && values.bannerUri) {
        await Promise.all([
          uploadUserPicture(values.pictureUri),
          uploadUserBanner(values.bannerUri),
        ]);
      } else {
        if (values.pictureUri) {
          await uploadUserPicture(values.pictureUri);
        }
        if (values.bannerUri) {
          await uploadUserBanner(values.bannerUri);
        }
      }

      const { data } = await edit({
        variables: {
          data: {
            fullName: values.fullName,
            nickname: values.nickname,
            instagramUsername: values.instagramUsername,
          },
        },
      });

      if (data?.userEdit) {
        onSuccess();

        setLoading(false);

        navigate('Me');

        return;
      }

      throw Error();
    } catch (e: any) {
      const { messages } = onFormError(e);

      messages && helpers.setErrors(messages);
      setLoading(false);
    }
  };

  return (
    <Container noBottomGradient keyboard>
      <Header title={t('user.screens.Edit.title')} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex={1} pt={3} pb={5}>
              <Box row center>
                <UserPicturePicker
                  id="pictureUri"
                  pictureId={params.pictureId}
                />
                <Box ml={2}>
                  <UserBannerPicker id="bannerUri" bannerId={params.bannerId} />
                </Box>
              </Box>
              <Text type="hint" pt={6} pb={0.5} pl={0.5}>
                {t('general.name')}
              </Text>
              <FormikTextInput
                id="fullName"
                placeholder={t('general.name')}
                contentType="name"
              />
              <Text type="hint" pt={2} pb={0.5} pl={0.5}>
                {t('user.nickname')}
              </Text>
              <FormikTextInput
                id="nickname"
                placeholder={t('user.nickname')}
                contentType="username"
              />
              <Text type="hint" pt={2} pb={0.5} pl={0.5}>
                {t('user.screens.Edit.instagramUser')}
              </Text>
              <FormikTextInput
                id="instagramUsername"
                placeholder={t('user.screens.Edit.instagramUser')}
                contentType="username"
              />
            </Box>
            <Button isLoading={isLoading} onPress={() => submitForm()} mt={4}>
              {t('general.save')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
