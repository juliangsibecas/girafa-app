import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import {
  ChatPreview,
  UserPreview,
  useUserFindUsersToChatLazyQuery,
} from '../../../api';
import {
  Box,
  Container,
  SearchInput,
  StateHandler,
  Text,
} from '../../../components';
import { useEffectExceptOnMount } from '../../../hooks';
import { UserRow } from '../../user/components';
import { ChatRow } from '../components';
import { useChats } from '../hooks';
import { ChatStackNavigationProp } from '../navigator';
import { ChatPreviewReadable } from '../types';

export const ChatHomeScreen = () => {
  const { navigate } = useNavigation<ChatStackNavigationProp>();
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const { chats, isChatsLoading, isChatsError } = useChats();
  const [findUsersToChat, { error: findUsersToChatError }] =
    useUserFindUsersToChatLazyQuery();
  const [searchText, setSearchText] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [filteredChats, setFilteredChats] =
    useState<Array<ChatPreviewReadable>>(chats);
  const [filteredUsers, setFilteredUsers] = useState<Array<UserPreview>>([]);

  const isLoading = isChatsLoading || isSearching;
  const isError = isChatsError || Boolean(findUsersToChatError);

  useEffectExceptOnMount(() => {
    const filter = async () => {
      if (searchText) {
        setFilteredChats(
          [...chats].filter(({ user: { nickname } }) =>
            nickname.match(new RegExp(`${searchText}.*`))
          )
        );

        const { data: usersToChatData } = await findUsersToChat({
          variables: { data: { q: searchText } },
        });

        if (usersToChatData) {
          if (chats.length) {
            setFilteredUsers(
              usersToChatData.userFindUsersToChat.filter(
                ({ _id }) =>
                  chats.findIndex(({ user }) => user._id === _id) === -1
              )
            );
          } else {
            setFilteredUsers(usersToChatData.userFindUsersToChat);
          }
        }
      } else {
        setFilteredChats(chats);
      }

      setSearching(false);
    };

    filter();
  }, [chats, searchText]);

  const handleChangeText = () => {
    setSearching(true);
  };

  const handleChangeDebouncedText = (debouncedText: string) =>
    setSearchText(debouncedText);

  const goToChat = ({
    chat,
    user,
  }: {
    chat?: ChatPreview;
    user?: UserPreview;
  }) => navigate('ChatDirect', { chat, user });

  return (
    <Container headerPlaceholder keyboardDismiss>
      <Text type="h1" mb={2}>
        {t('chats')}
      </Text>
      <SearchInput
        onChangeText={handleChangeText}
        onChangeDebouncedText={handleChangeDebouncedText}
      />
      <StateHandler isLoading={isLoading} isError={isError}>
        {!!filteredChats.length && (
          <Box mt={2}>
            <FlatList
              keyExtractor={(item) => item._id}
              data={filteredChats}
              renderItem={({ item }) => (
                <ChatRow chat={item} onPress={() => goToChat({ chat: item })} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        )}
        {!!searchText.length && !!filteredUsers.length && (
          <>
            <Text type="h3" mt={2} mb={1}>
              {t('screens.ChatHome.users')}
            </Text>
            <FlatList
              data={filteredUsers}
              renderItem={({ item }) => (
                <UserRow user={item} go={() => goToChat({ user: item })} />
              )}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            />
          </>
        )}
      </StateHandler>
    </Container>
  );
};
