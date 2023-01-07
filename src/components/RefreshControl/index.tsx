import { RefreshControl as RNRefreshControl } from 'react-native';
import { useTheme } from '../../theme';
interface IRefreshControl {
  isRefreshing: boolean;
  onRefresh?: () => void;
}

export const RefreshControl: React.FC<IRefreshControl> = ({
  isRefreshing,
  onRefresh: handleRefresh,
}) => {
  const { theme } = useTheme();
  return (
    <RNRefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      tintColor={theme.palette.text.secondary}
    />
  );
};
