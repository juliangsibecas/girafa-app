import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useChatListQuery, useChatMessageSentSubscription } from '../../api';
import { useAppStatus, useEffectExceptOnMount } from '../../hooks';
import { useAuth } from '../auth';
import { ChatContext } from './context';
import { ChatPreviewReadable } from './types';
import {
  addLastMessageToCache,
  addMessageToCache,
  isChatOnCache,
} from './utils';

interface IChatProvider {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<IChatProvider> = ({ children }) => {
  const { isForeground } = useAppStatus();
  const { userId, accessToken } = useAuth();
  const {
    data: chatFindData,
    loading: isChatFindLoading,
    error: chatFindError,
    refetch,
  } = useChatListQuery();
  const { data: newMessageData } = useChatMessageSentSubscription({
    variables: { data: { token: accessToken } },
  });
  const [chats, setChats] = useState<Array<ChatPreviewReadable>>([]);
  const [unreadChats, setUnreadChats] = useState<Array<string>>([]);
  const [chatsLastMessageRead, setChatsLastMessageRead] = useState<
    Record<string, Date>
  >({});

  useEffect(() => {
    const getChatsLastMessageRead = async () => {
      try {
        setChatsLastMessageRead(
          JSON.parse(
            (await AsyncStorage.getItem('chatsLastMessageRead')) ?? '{}'
          )
        );
      } catch (e) {
        console.log(e);
      }
    };
    getChatsLastMessageRead();
  }, []);

  useEffect(() => {
    const setChatsLastMessageRead = async () => {
      try {
        await AsyncStorage.setItem(
          'chatsLastMessageRead',
          JSON.stringify(chatsLastMessageRead)
        );
      } catch (e) {
        console.log(e);
      }
    };

    setChatsLastMessageRead();
  }, [chatsLastMessageRead]);

  useEffectExceptOnMount(() => {
    console.log('Foreground', isForeground);
    if (isForeground) {
      refetch();
    }
  }, [isForeground]);

  useEffect(() => {
    if (chatFindData?.chatList) {
      setChats(
        chatFindData.chatList.map((chat) => {
          const lastRead = chatsLastMessageRead[chat._id];

          if (
            chat.lastMessage.fromId !== userId &&
            (!lastRead || lastRead < chat.lastMessage.createdAt)
          ) {
            setUnreadChats((unreadChats) => [...unreadChats, chat._id]);

            return { ...chat, isUnread: true };
          }

          return { ...chat, isUnread: false };
        })
      );
    }
  }, [chatFindData, chatsLastMessageRead]);

  useEffect(() => {
    if (newMessageData && newMessageData.chatMessageSent) {
      const newMessage = newMessageData.chatMessageSent;

      if (isChatOnCache(newMessage.chatId)) {
        addMessageToCache(newMessage);
      }

      addLastMessageToCache(newMessage);
    }
  }, [newMessageData]);

  const updateChatRead = ({
    chatId,
    lastMessageDate,
  }: {
    chatId: string;
    lastMessageDate: Date;
  }) => {
    setUnreadChats((unreadChats) => unreadChats.filter((id) => id !== chatId));

    setChatsLastMessageRead({
      ...chatsLastMessageRead,
      [chatId]: lastMessageDate,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        isChatsLoading: isChatFindLoading,
        isChatsError: Boolean(chatFindError),
        unreadChatsCount: unreadChats.length,
        updateChatRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
