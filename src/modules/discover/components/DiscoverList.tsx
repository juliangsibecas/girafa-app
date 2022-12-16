import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity } from 'react-native';
import { PartyPreview, UserPreview } from '../../../api';
import { Box, Text } from '../../../components';
import { PartyRow } from '../../party';
import { UserCard, UserRow } from '../../user';
import { DiscoverStackScreenProps } from '../navigator';

type Props = {
  type: 'user' | 'party';
  data: Array<UserPreview | PartyPreview>;
  isOnly: boolean;
  isShowingAll: boolean;
  isCardsListMode: boolean;
  showAll: (status: boolean) => void;
};

export const DiscoverList: React.FC<Props> = ({
  type,
  data,
  isOnly,
  isShowingAll,
  showAll,
  isCardsListMode,
}) => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<DiscoverStackScreenProps<'List'>['navigation']>();

  const isUser = type === 'user';

  const PartyItem = PartyRow;
  const UserItem = isCardsListMode ? UserCard : UserRow;

  const goToUser = (id: string) => navigate('UserProfile', { id });
  const goToParty = (id: string) => navigate('PartyDetail', { id });

  return (
    <>
      <Box
        flex
        row
        style={{ justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        <Text type="h4">
          {isUser ? t('general.users') : t('general.parties')}
        </Text>
        {data.length > 4 || !isOnly ? (
          <TouchableOpacity onPress={() => showAll(!isShowingAll)}>
            <Text type="hint">
              {isShowingAll ? t('general.seeLess') : t('general.seeMore')}
            </Text>
          </TouchableOpacity>
        ) : undefined}
      </Box>
      {isShowingAll || isOnly ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Box mt={2}>
              {isUser ? (
                <UserItem
                  key={item._id}
                  user={item as UserPreview}
                  go={goToUser}
                />
              ) : (
                <PartyItem
                  key={item._id}
                  party={item as PartyPreview}
                  go={goToParty}
                />
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
                <UserRow
                  key={item._id}
                  user={item as UserPreview}
                  go={goToUser}
                />
              ) : (
                <PartyRow
                  key={item._id}
                  party={item as PartyPreview}
                  go={goToParty}
                />
              )}
            </Box>
          ))
      )}
    </>
  );
};
