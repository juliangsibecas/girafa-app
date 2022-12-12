import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { ErrorCode, ErrorDescription } from './generated';

export const useResponse = () => {
  const { t } = useTranslation();

  const onSuccess = () => {
    Toast.show({
      type: 'success',
      text1: t('api.success'),
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
