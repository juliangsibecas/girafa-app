import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { useSupportSendMessageMutation } from '../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Text,
} from '../../components';
import { MyProfileStackScreenProps } from '../user';

type FormValues = {
  subject: string;
  body: string;
};

export const SupportScreen: React.FC = () => {
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'Support'>['navigation']>();
  const [sendMessage, { loading: isLoading }] = useSupportSendMessageMutation();

  const initialValues: FormValues = {
    subject: '',
    body: '',
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required().min(4),
    body: Yup.string().required().min(4),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await sendMessage({
        variables: {
          data: values,
        },
      });

      if (data?.supportSendMessage) {
        Toast.show({
          type: 'success',
          text1: 'Exito',
        });

        navigate('Settings');
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar mandar el msj',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar mandar el msj',
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
              <FormikTextInput id="subject" placeholder="Asunto" />
              <FormikTextInput
                id="body"
                placeholder="Mensaje"
                mt={2}
                lines={4}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              Enviar mensaje
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
