import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';

import { useAuth } from '../../modules/auth/hooks';
import { useTheme } from '../../theme';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { RefreshControl } from '../RefreshControl';
import { Spinner } from '../Spinner';
import { Text } from '../Text';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isRefreshEnabled?: boolean;
  isRefreshing?: boolean;
  showSignOutOnError?: boolean;
  onRefresh?: () => void;
};

const RefreshControlWrapper: React.FC<
  Pick<Props, 'children' | 'isRefreshing' | 'onRefresh'>
> = ({ isRefreshing, onRefresh: handleRefresh, children }) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: theme.palette.background.main }}
      refreshControl={
        RefreshControl({
          isRefreshing: isRefreshing!,
          onRefresh: handleRefresh,
        })!
      }
    >
      {children}
    </ScrollView>
  );
};

export const StateHandler: React.FC<Props> = ({
  isLoading,
  isError,
  isRefreshEnabled,
  isRefreshing,
  onRefresh,
  showSignOutOnError,
  children,
}) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  if (isLoading || isError) {
    return (
      <Box flexGrow={1} bgColor="background" center>
        {isLoading && <Spinner />}
        {isError && !isLoading && (
          <>
            <Icon name="error" color="error" size={10} />
            <Text mt={2}>{t('general.error')}</Text>
            {showSignOutOnError && (
              <Box mt={1}>
                <TouchableOpacity onPress={signOut}>
                  <Text type="hint" color="text.secondary">
                    {t('general.signOut')}
                  </Text>
                </TouchableOpacity>
              </Box>
            )}
          </>
        )}
      </Box>
    );
  }

  if (children) {
    return isRefreshEnabled ? (
      <RefreshControlWrapper isRefreshing={isRefreshing} onRefresh={onRefresh}>
        {children}
      </RefreshControlWrapper>
    ) : (
      <>{children}</>
    );
  }

  return <></>;
};
