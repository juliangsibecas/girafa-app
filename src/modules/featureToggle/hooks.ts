import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import {
  FeatureToggleName,
  useFeatureToggleGetEnabledNamesQuery,
} from '../../api';
import { getTimeBasedFetchPolicy } from '../../apollo';

const ONE_MINUTE = 1000 * 60;
const EXPIRY_TIME = ONE_MINUTE * 5;

export const useFeatureToggle = (name: FeatureToggleName) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFeatureToggleGetEnabledNamesQuery({
    fetchPolicy: 'network-only' ?? getTimeBasedFetchPolicy(EXPIRY_TIME),
  });

  const isEnabled = Boolean(
    !error && !loading && data?.featureToggleGetEnabledNames.includes(name)
  );

  const handleAction = (action: () => void) => {
    if (isEnabled) {
      return action();
    }

    Toast.show({ type: 'error', text1: t('api.featureToggleDisabled') });
  };

  return {
    isEnabled,
    isLoading: loading,
    isError: Boolean(error),
    handleAction,
  };
};
