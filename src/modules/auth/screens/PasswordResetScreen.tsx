import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { useRecoverPasswordMutation, useSignInMutation } from '../../../api';
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
import { useAuth } from '../hooks';

type FormValues = {
  code: string;
  password: string;
  confirmPassword: string;
};

export const PasswordResetScreen: React.FC = () => {
  const { signIn } = useAuth();
  const { params } = useRoute<OnboardingRouteProp<'CodeGeneration'>>();
  const { navigate } =
    useNavigation<OnboardingNavigationProp<'CodeGeneration'>>();
  const [recoverPassword, { loading: isGenerationLoading }] =
    useRecoverPasswordMutation();
  const [signInMutation, { loading: isSignInLoading }] = useSignInMutation();

  const initialValues: FormValues = {
    code: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(),
    password: Yup.string().required().min(4),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await recoverPassword({
        variables: {
          data: {
            email: params.email!,
            password: values.password,
            code: values.code,
          },
        },
      });

      if (data?.recoverPassword) {
        const res = await signInMutation({
          variables: {
            data: {
              email: params.email!,
              password: values.password,
            },
          },
        });

        if (res.errors || !res.data) {
          navigate('Onboarding');
          return;
        }

        signIn(res.data.signIn);
        return;
      }

      helpers.setErrors({
        code: 'El codigo esta mal bro.',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar validar el codigo',
      });
    }
  };

  return (
    <Container noBottomTab>
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
                id="code"
                placeholder="Codigo"
                keyboardType="numeric"
                maxLength={4}
              />
              <FormikTextInput
                id="password"
                placeholder="Contra"
                contentType="password"
                mt={1}
              />
              <FormikTextInput
                id="confirmPassword"
                placeholder="Confirmar contra"
                contentType="password"
                mt={1}
              />
            </Box>
            <Button
              onPress={() => submitForm()}
              isLoading={isGenerationLoading || isSignInLoading}
            >
              Cambiar contrasena
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
