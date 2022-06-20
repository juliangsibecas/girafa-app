import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme';

type Props = {
  color?: 'primary' | 'background';
};

export const Spinner: React.FC<Props> = ({ color = 'primary' }) => {
  const { theme } = useTheme();

  return <ActivityIndicator color={theme.palette[color].main} />;
};
