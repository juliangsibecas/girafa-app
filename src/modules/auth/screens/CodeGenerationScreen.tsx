import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { useGenerateRecoveryCodeMutation } from '../../../api';
import {
  Box,
  Button,
  Container,
  FormikTextInput,
  Text,
} from '../../../components';
import {
  OnboardingNavigationProp,
  OnboardingRouteProp,
} from '../../onboarding';

type FormValues = {
  email: string;
};

export const CodeGenerationScreen: React.FC = () => {
  const { params } = useRoute<OnboardingRouteProp<'CodeGeneration'>>();
  const { navigate } =
    useNavigation<OnboardingNavigationProp<'CodeGeneration'>>();
  const [generateRecoveryCode, { loading: isLoading }] =
    useGenerateRecoveryCodeMutation();

  const initialValues: FormValues = {
    email: params.email ?? '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await generateRecoveryCode({
        variables: {
          data: {
            email: values.email,
          },
        },
      });

      if (data?.generateRecoveryCode) {
        navigate('PasswordRecovery', { email: values.email });
      }

      helpers.setErrors({
        email: 'El correo esta mal bro.',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar generar el codigo',
      });
    }
  };

  return (
    <Container noBottomTab>
      <Text type="h2" textCenter mb={2}>
        Holanda
      </Text>
      <Text textCenter mb={2}>
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
                id="email"
                placeholder="Correo electronico"
                keyboardType="email-address"
                contentType="emailAddress"
                mt={1}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              Enviar codigo
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
