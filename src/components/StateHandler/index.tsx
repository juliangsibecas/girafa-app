import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Box } from '../Box';
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
  if (isLoading || isError) {
    return (
      <Box flexGrow={1} bgColor="background" vcenter>
        {isLoading && <Spinner />}
        {isError && <Text>Error</Text>}
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
