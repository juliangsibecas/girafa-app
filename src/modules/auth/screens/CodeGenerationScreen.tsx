import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import {
  FeatureToggleName,
  useGenerateRecoveryCodeMutation,
  useResponse,
} from '../../../api';
import {
  Box,
  Container,
  FeatureToggledButton,
  FormikTextInput,
  Header,
} from '../../../components';

import {
  OnboardingNavigationProp,
  OnboardingRouteProp,
} from '../../onboarding';

type FormValues = {
  email: string;
};

export const CodeGenerationScreen: React.FC = () => {
  const { t } = useTranslation();
  const { onFormError } = useResponse();
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
        return;
      }
    } catch (e: any) {
      const { messages } = onFormError(e);

      messages && helpers.setErrors(messages);
    }
  };

  const handlePress = (submitForm: () => void) => {
    return () => submitForm();
  };

  return (
    <Container noBottomTab keyboard>
      <Header
        title={t('auth.screens.CodeGeneration.title')}
        subtitle={t('auth.screens.CodeGeneration.subtitle')}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <>
            <Box flex={1}>
              <FormikTextInput
                id="email"
                placeholder={t('user.email')}
                keyboardType="email-address"
                contentType="emailAddress"
                mt={1}
              />
            </Box>
            <FeatureToggledButton
              ft={FeatureToggleName.Mailing}
              isLoading={isLoading}
              onPress={handlePress(submitForm)}
              mt={4}
            >
              {t('auth.screens.CodeGeneration.sendCode')}
            </FeatureToggledButton>
          </>
        )}
      </Formik>
    </Container>
  );
};
