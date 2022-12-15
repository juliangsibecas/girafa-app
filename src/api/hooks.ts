import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { ErrorCode, ErrorDescription } from './generated';

type ResponseData = {
  title?: string;
  description?: string;
  time?: number;
};
export const useResponse = () => {
  const { t } = useTranslation();

  const onSuccess = (data?: ResponseData) => {
    Toast.show({
      type: 'success',
      text1: data?.title ?? t('api.success'),
      text2: data?.description,
      visibilityTime: data?.time,
    });
  };

  const onError = () => {
    Toast.show({
      type: 'error',
      text1: t('api.error'),
    });
  };

  const onFormError = (e: ApolloError) => {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const error = e.graphQLErrors[0];

      if (error.message === ErrorCode.ValidationError) {
        const [key, value] = Object.entries(error.extensions)[0];

        return {
          messages: {
            [key]: t(`api.responses.${value as ErrorDescription}`),
          },
        };
      }

      onError();
    }

    return {
      messages: null,
    };
  };

  return { onSuccess, onError, onFormError };
};
