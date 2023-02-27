import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useEffect, useState } from 'react';

import {
  useChatListQuery,
  useChatMessageSentSubscription,
  useChatUserGetLazyQuery,
} from '../../api';
import { useAppStatus, useEffectExceptOnMount } from '../../hooks';

import { useAuth } from '../auth';
import { ChatContext } from './context';
import { ChatPreviewReadable } from './types';
import {
  addChatToCache,
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
  const { data: newMessageData, error } = useChatMessageSentSubscription({
    variables: { data: { token: accessToken } },
  });
  const [getChatUser] = useChatUserGetLazyQuery();
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
    if (isForeground) {
      refetch();
    }
  }, [isForeground]);

  useEffect(() => {
    if (chatFindData?.chatList) {
      const unreads: Array<string> = [];

      setChats(
        chatFindData.chatList
          .map((chat) => {
            const lastRead = chatsLastMessageRead[chat._id];

            if (
              chat.lastMessage.fromId !== userId &&
              (!lastRead || lastRead < chat.lastMessage.createdAt)
            ) {
              unreads.push(chat._id);

              return { ...chat, isUnread: true };
            }

            return { ...chat, isUnread: false };
          })
          .sort((chatA, chatB) =>
            moment(chatB.lastMessage.createdAt).diff(
              moment(chatA.lastMessage.createdAt)
            )
          )
      );

      setUnreadChats(unreads);
    }
  }, [chatFindData, chatsLastMessageRead]);

  useEffectExceptOnMount(() => {
    const handleNewMessage = async () => {
      if (newMessageData && newMessageData.chatMessageSent) {
        const newMessage = newMessageData.chatMessageSent;

        if (isChatOnCache(newMessage.chatId)) {
          addMessageToCache(newMessage);
        }

        if (
          newMessage.fromId !== userId &&
          chats.findIndex(({ _id }) => newMessage.chatId === _id) === -1
        ) {
          const getUserQuery = await getChatUser({
            variables: { data: { id: newMessage.chatId } },
          });

          if (getUserQuery.data?.chatUserGet) {
            addChatToCache({
              _id: newMessage.chatId,
              user: getUserQuery.data.chatUserGet,
              lastMessage: {
                ...newMessage,
                __typename: 'ChatMessage',
              },
            });
          }
        }

        addLastMessageToCache(newMessage);
      }
    };
    handleNewMessage();
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
