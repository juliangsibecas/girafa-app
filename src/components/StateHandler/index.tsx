import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { Text } from '../Text';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isRefreshEnabled?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
};

const RefreshControlWrapper: React.FC<
  Pick<Props, 'children' | 'isRefreshing' | 'onRefresh'>
> = ({ isRefreshing, onRefresh, children }) => (
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl
        refreshing={Boolean(isRefreshing)}
        onRefresh={onRefresh}
      />
    }
  >
    {children}
  </ScrollView>
);

export const StateHandler: React.FC<Props> = ({
  isLoading,
  isError,
  isRefreshEnabled,
  isRefreshing,
  onRefresh,
  children,
}) => {
  const { t } = useTranslation();
  if (isLoading || isError) {
    return (
      <Box flexGrow={1} bgColor="background" center>
        {isLoading && <Spinner />}
        {isError && (
          <>
            <Icon name="error" color="error" size={10} />
            <Text mt={2}>{t('general.error')}</Text>
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
