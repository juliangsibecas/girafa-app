import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, TouchableOpacity, VirtualizedList } from 'react-native';

import { ChatMessage, UserPreview } from '../../../api';
import { Box, Button, Icon, Text, TextInput } from '../../../components';
import { useKeyboard } from '../../../hooks';
import { isAndroid } from '../../../utils';

import { UserAvatar } from '../../user/components';

import { useChats } from '../hooks';
import { ChatStackScreenProps } from '../navigator';

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
  const { push } =
    useNavigation<ChatStackScreenProps<'ChatDirect'>['navigation']>();
  const { keyboardHeight } = useKeyboard({
    keyboardWillShow: (evt) =>
      setTimeout(() => virtualizedListRef.current?.scrollToEnd(), evt.duration),
  });
  const { updateChatRead } = useChats();
  const [text, setText] = useState('');
  const [isSendDisabled, setSendDisabled] = useState(false);
  const virtualizedListRef = useRef<VirtualizedList<any>>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (id && messages.length) {
      updateChatRead({
        chatId: id,
        lastMessageDate: messages[messages.length - 1].createdAt,
      });
    }
  }, [id, messages]);

  const getItem = (data: Array<ChatMessage>, index: number) => {
    return data[index];
  };
  const getCount = () => messages.length;

  const handleSend = () => {
    setSendDisabled(true);
    sendMessage(text);
    setText('');
    setTimeout(() => setSendDisabled(false), 2000);
  };

  const handleUserPress = () => push('UserProfile', { id: user._id });
  const handleAndroidFocus = () => {
    if (isAndroid) {
      setTimeout(() => virtualizedListRef.current?.scrollToEnd(), 300);
    }
  };

  return (
    <Animated.View style={{ flex: 1, paddingBottom: keyboardHeight }}>
      <TouchableOpacity onPress={handleUserPress}>
        <Box row hcenter>
          <UserAvatar id={user.pictureId} />
          <Text type="h2" ml={2}>
            {user.nickname}
          </Text>
        </Box>
      </TouchableOpacity>
      <Box flex={1} py={1}>
        <VirtualizedList
          ref={virtualizedListRef}
          keyExtractor={({ fromId, createdAt }) => `${fromId}-${createdAt}`}
          data={messages}
          renderItem={({ item }) => (
            <ChatBubble
              key={`${item.fromId}-${item.createdAt}`}
              message={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          getItem={getItem}
          getItemCount={getCount}
          onContentSizeChange={() => {
            virtualizedListRef.current?.scrollToEnd();
          }}
        />
      </Box>
      <Box row>
        <Box flex={1} mr={2}>
          <TextInput
            placeholder={t('write')}
            value={text}
            onChangeText={setText}
            autoCapitalize="sentences"
            onFocus={handleAndroidFocus}
          />
        </Box>
        <Button
          px={2}
          style={{ height: 'auto' }}
          onPress={handleSend}
          isDisabled={!text.trim().length || isSendDisabled}
        >
          <Icon name="send" size={3} color="background.main" />
        </Button>
      </Box>
    </Animated.View>
  );
};
