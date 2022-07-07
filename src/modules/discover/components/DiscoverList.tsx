import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { PartyPreview, UserPreview } from '../../../api';
import { Box, Text } from '../../../components';
import { PartyRow } from '../../party';
import { UserCard, UserRow } from '../../user';
import { DiscoverStackScreenProps } from '../navigator';

type Props = {
  type: 'user' | 'party';
  data: Array<UserPreview | PartyPreview>;
  isShowingAll: boolean;
  showAll: (status: boolean) => void;
  isCardsListMode: boolean;
};

export const DiscoverList: React.FC<Props> = ({
  type,
  data,
  isShowingAll,
  showAll,
  isCardsListMode,
}) => {
  const { navigate } =
    useNavigation<DiscoverStackScreenProps<'List'>['navigation']>();

  const isUser = type === 'user';

  const PartyItem = PartyRow;
  const UserItem = isCardsListMode ? UserCard : UserRow;

  const go = (id: string) =>
    navigate(isUser ? 'UserProfile' : 'PartyDetail', { id });

  return (
    <>
      <Box
        flex
        row
        style={{ justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        <Text type="h4">{isUser ? 'Usuarios' : 'Fiestas'}</Text>
        {data.length > 4 ? (
          <TouchableOpacity onPress={() => showAll(!isShowingAll)}>
            <Text type="hint">{isShowingAll ? 'Ver menos' : 'Ver mas'}</Text>
          </TouchableOpacity>
        ) : undefined}
      </Box>
      {isShowingAll ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Box mt={1}>
              {isUser ? (
                <UserItem user={item as UserPreview} go={go} />
              ) : (
                <PartyItem party={item as PartyPreview} go={go} />
              )}
            </Box>
          )}
        />
      ) : (
        data
          .slice(0, 4)
          .map((item) => (
            <Box mt={2}>
              {isUser ? (
                <UserRow key={item._id} user={item as UserPreview} go={go} />
              ) : (
                <PartyRow key={item._id} party={item as PartyPreview} go={go} />
              )}
            </Box>
          ))
      )}
    </>
  );
};
