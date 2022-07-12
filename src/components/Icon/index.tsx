import {
  AlignJustify,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  List,
  MapPin,
  Menu,
  Search,
  Send,
  Share,
  Share2,
  Square,
  User,
} from 'react-native-feather';
import { useTheme } from '../../theme';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  name: keyof typeof dict;
  size?: number;
  weight?: number;
  isFilled?: boolean;
};

const dict = {
  home: Home,
  search: Search,
  bell: Bell,
  user: User,
  send: Send,
  square: Square,
  list: List,
  menu: Menu,

  share: Share,
  'share-2': Share2,

  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,

  'map-pin': MapPin,

  'align-justify': AlignJustify,
};

export const Icon: React.FC<Props> = ({
  name,
  size: nSize,
  weight,
  isFilled,
  ...props
}) => {
  const { theme } = useTheme();
  const style = useStyle(props);

  const FeatherIcon = dict[name];
  const size = theme.spacing(nSize ?? 2);

  return (
    <FeatherIcon
      width={size}
      height={size}
      fill={isFilled ? style.color : undefined}
      stroke={style.color}
      strokeWidth={weight ?? 2}
      style={style}
    />
  );
};
