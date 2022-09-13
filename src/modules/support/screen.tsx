import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useResponse, useSupportSendMessageMutation } from '../../api';
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
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
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

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data } = await sendMessage({
        variables: {
          data: values,
        },
      });

      if (data?.supportSendMessage) {
        onSuccess();

        navigate('Settings');
        return;
      }

      throw Error();
    } catch (e: any) {
      onError();
      console.log(e);
    }
  };

  return (
    <Container noBottomGradient keyboardDismiss>
      <Text type="h2" textCenter mb={2}>
        {t('support.screens.Support.title')}
      </Text>
      <Text textCenter mb={4}>
        {t('support.screens.Support.subtitle')}
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
                id="subject"
                placeholder={t('support.screens.Support.subject')}
              />
              <FormikTextInput
                id="body"
                placeholder={t('support.screens.Support.body')}
                mt={2}
                lines={4}
              />
            </Box>
            <Button onPress={() => submitForm()} isLoading={isLoading}>
              {t('support.screens.Support.sendMessage')}
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
};
