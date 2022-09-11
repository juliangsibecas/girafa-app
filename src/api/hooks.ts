import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

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

  return { onSuccess, onError };
};
