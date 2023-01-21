import { TouchableOpacity } from 'react-native';
import { FeatureToggleName, PartyPreview } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { useFeatureToggle } from '../../featureToggle';
import { PartyAvatar } from './PartyAvatar';

type Props = {
  party: PartyPreview;
  go: (id: string) => void;
};

export const PartyRow: React.FC<Props> = ({ party, go }) => {
  const { handleAction: handlePartyGetAction } = useFeatureToggle(
    FeatureToggleName.PartyGet
  );

  const handlePress = () => handlePartyGetAction(() => go(party._id));
  return (
    <TouchableOpacity onPress={handlePress}>
      <Box row hcenter>
        <PartyAvatar id={party._id} width={6} height={6} placeholderSize={4} />
        <Box ml={2} flex={1}>
          <Text type="h4" fontFamily={FontFamily.BOLD}>
            {party.name}
          </Text>
          <Text>{party.organizerNickname}</Text>
        </Box>
        <Icon name="chevron-right" color="primary" />
      </Box>
    </TouchableOpacity>
  );
};
