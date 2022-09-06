import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { useChangePasswordMutation } from '../../../api';
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
        Toast.show({
          type: 'success',
          text1: 'Exito',
        });

        navigate('Settings');
        return;
      }

      helpers.setErrors({
        currentPassword: 'La pw esta mal bro.',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar actualizar la pw',
      });
    }
  };

  return (
    <Container noBottomGradient>
      <Text type="h2" textCenter mb={2}>
        Holanda
      </Text>
      <Text textCenter mb={4}>
        Holanda
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
                placeholder="Contra actual"
                contentType="password"
              />
              <FormikTextInput
                id="newPassword"
                placeholder="Contra nueva"
                contentType="password"
                mt={4}
              />
              <FormikTextInput
                id="confirmPassword"
                placeholder="Confirmar contra"
                contentType="password"
                mt={1}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              Cambiar contrasena
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
