import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { ChatMessage, UserPreview } from '../../../api';
import { Box, Button, Icon, Text, TextInput } from '../../../components';

import { UserAvatar } from '../../user';

import { useChats } from '../hooks';

import { ChatBubble } from './ChatBubble';

interface IChat {
  id: string;
  user: UserPreview;
  messages: Array<ChatMessage>;
  sendMessage: (text: string) => void;
}

export const Chat: React.FC<IChat> = ({ id, user, messages, sendMessage }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'chat.screens.ChatDirect',
  });
  const { updateChatRead } = useChats();
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (id && messages.length) {
      updateChatRead({
        chatId: id,
        lastMessageDate: messages[messages.length - 1].createdAt,
      });

      setTimeout(() => flatListRef.current?.scrollToEnd(), 50);
    }
  }, [id, messages]);

  const handleSend = () => {
    sendMessage(text);
    setText('');
  };

  return (
    <>
      <Box row hcenter px={2}>
        <UserAvatar id={user.pictureId} />
        <Text type="h2" ml={2}>
          {user.nickname}
        </Text>
      </Box>
      <Box flex={1} py={1}>
        <FlatList
          ref={flatListRef}
          initialScrollIndex={messages.length - 1}
          keyExtractor={({ fromId, createdAt }) => `${fromId}-${createdAt}`}
          data={messages}
          renderItem={({ item }) => (
            <ChatBubble
              key={`${item.fromId}-${item.createdAt}`}
              message={item}
            />
          )}
          getItemLayout={(_, index) => ({
            length: 68,
            offset: 68 * index,
            index,
          })}
        />
      </Box>
      <Box row px={2}>
        <Box flex={1} mr={2}>
          <TextInput
            placeholder={t('write')}
            value={text}
            onChangeText={setText}
          />
        </Box>
        <Button
          px={2}
          style={{ height: 'auto' }}
          onPress={handleSend}
          isDisabled={!text}
        >
          <Icon name="send" size={3} color="background.main" />
        </Button>
      </Box>
    </>
  );
};
