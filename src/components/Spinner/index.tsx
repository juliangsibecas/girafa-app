import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme';

export const Spinner = () => {
  const { theme } = useTheme();

  return <ActivityIndicator color={theme.palette.primary.main} />;
};
