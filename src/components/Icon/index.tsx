import {
  AlertCircle,
  AlignJustify,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  XCircle,
  Home,
  Image,
  List,
  MapPin,
  Menu,
  Plus,
  Search,
  Send,
  Share,
  Share2,
  Square,
  User,
  Clock,
  Edit,
  Instagram,
} from 'react-native-feather';
import { SvgProps } from 'react-native-svg';

import { useTheme } from '../../theme';
import { UiKeys, useStyle } from '../../ui';
import LogoIcon from '../../assets/icons/logo.svg';
import PartyIcon from '../../assets/icons/party.svg';
import UserCardIcon from '../../assets/icons/user_card.svg';

type Props = UiKeys & {
  name: keyof typeof dict;
  size?: number;
  weight?: number;
  isFilled?: boolean;
  noStroke?: boolean;
};

const dict = {
  logo: LogoIcon,
  warning: AlertCircle,
  error: XCircle,
  home: Home,
  search: Search,
  bell: Bell,
  user: User,
  'user-card': UserCardIcon,
  party: PartyIcon,
  send: Send,
  square: Square,
  list: List,
  menu: Menu,
  plus: Plus,
  calendar: Calendar,
  image: Image,
  check: Check,
  clock: Clock,
  edit: Edit,
  instagram: Instagram,

  share: Share,
  'share-2': Share2,

  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,

  'map-pin': MapPin,

  'align-justify': AlignJustify,
};

export const Icon: React.FC<Props> = ({
  name,
  size: nSize,
  weight,
  isFilled,
  noStroke,
  ...props
}) => {
  const { theme } = useTheme();
  const style = useStyle({
    ...props,
    color: props.color ?? 'text.primary',
  });

  const FeatherIcon: (props: SvgProps) => JSX.Element = dict[name];
  const size = theme.spacing(nSize ?? 2);

  return (
    <FeatherIcon
      width={size}
      height={size}
      fill={isFilled ? style.color : undefined}
      stroke={!noStroke ? style.color : undefined}
      strokeWidth={weight ?? 2}
      style={style}
    />
  );
};
