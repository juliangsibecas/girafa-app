import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../theme';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  name: string;
  size?: number;
};

export const Icon: React.FC<Props> = ({ name, size, ...props }) => {
  const { theme } = useTheme();
  const style = useStyle(props);

  return (
    <FAIcon
      name={name}
      size={size ? theme.spacing(size) : undefined}
      style={style}
    />
  );
};
