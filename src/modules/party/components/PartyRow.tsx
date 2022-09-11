import { TouchableOpacity } from 'react-native';
import { PartyPreview } from '../../../api';
import { Box, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { PartyAvatar } from './PartyAvatar';

type Props = {
  party: PartyPreview;
  go: (id: string) => void;
};

export const PartyRow: React.FC<Props> = ({ party, go }) => {
  console.log(party);
  return (
    <TouchableOpacity onPress={() => go(party._id)}>
      <Box flex row hcenter>
        <PartyAvatar id={party._id} width={6} />
        <Box ml={2} flexGrow={1}>
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
