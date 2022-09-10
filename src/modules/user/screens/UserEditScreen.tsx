import React from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { Formik, FormikHelpers } from 'formik';
import { GraphQLErrors } from '@apollo/client/errors';
import { useNavigation, useRoute } from '@react-navigation/native';

import { UserGetByIdDocument, useUserEditMutation } from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Text,
} from '../../../components';
import { MyProfileStackScreenProps } from '../navigator';
import { useAuth } from '../../auth';
import { UserPicturePicker } from '../comonents';
import { usePictureUpload } from '../../picture';

type FormValues = {
  picture?: string;
  fullName: string;
  nickname: string;
};

export const UserEditScreen: React.FC = () => {
  const { userId } = useAuth();
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
      .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras y espacios.'),
    nickname: Yup.string()
      .required()
      .min(3)
      .max(15)
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
        Toast.show({
          type: 'success',
          text1: 'Exito',
        });

        if (values.picture) {
          await uploadUser(values.picture);
        }

        navigate('Profile');

        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar editar',
      });
    } catch (e: any) {
      const errors = e.graphQLErrors as GraphQLErrors;
      const error = errors[0];

      if (error && error.message === 'VALIDATION_ERROR') {
        helpers.setErrors(error.extensions);
        return;
      }

      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar editar',
      });
    }
  };

  return (
    <Container noBottomGradient>
      <Text type="h2" textCenter mb={2}>
        Bienvenido
      </Text>
      <Text textCenter mb={6}>
        Bienvenido
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
                Nombre
              </Text>
              <FormikTextInput
                id="fullName"
                placeholder="Nombre"
                contentType="name"
              />
              <Text type="hint" mt={2} mb={0.5} ml={0.5}>
                Nombre de usuario
              </Text>
              <FormikTextInput
                id="nickname"
                placeholder="Nombre de usuario"
                contentType="username"
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              Editar
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
