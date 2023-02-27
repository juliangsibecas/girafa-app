import { gql } from '@apollo/client';
import {
  ChatGetIdByUserIdDocument,
  ChatListDocument,
  ChatMessagesGetDocument,
  ChatNewMessageResponse,
  ChatPreview,
} from '../../api';
import { client } from '../../apollo';

export const addChatToCache = (chat: ChatPreview) => {
  const data = client.readQuery({ query: ChatListDocument });

  client.writeQuery({
    query: ChatListDocument,
    data: {
      chatList: [chat, ...data.chatList],
    },
  });

  client.writeQuery({
    query: ChatGetIdByUserIdDocument,
    data: {
      chatGetIdByUserId: chat._id,
    },
    variables: {
      data: {
        userId: chat.user._id,
      },
    },
  });

  client.writeQuery({
    query: ChatMessagesGetDocument,
    data: {
      chatMessagesGet: [chat.lastMessage],
    },
    variables: {
      data: {
        chatId: chat._id,
      },
    },
  });
};

export const addMessageToCache = (data: ChatNewMessageResponse) => {
  const messegesGetRes = client.readQuery({
    query: ChatMessagesGetDocument,
    variables: { data: { chatId: data.chatId } },
  });

  client.writeQuery({
    query: ChatMessagesGetDocument,
    data: {
      chatMessagesGet: [...messegesGetRes.chatMessagesGet, data],
    },
    variables: {
      data: {
        chatId: data.chatId,
      },
    },
  });
};

export const addLastMessageToCache = ({
  chatId,
  ...message
}: ChatNewMessageResponse) => {
  client.writeQuery({
    query: gql`
      query writeChat($id: String!) {
        chatList(id: $id) {
          _id
          lastMessage {
            fromId
            text
            createdAt
          }
        }
      }
    `,
    data: {
      chatList: {
        __typename: 'ChatPreview',
        _id: chatId,
        lastMessage: message,
      },
    },
    variables: {
      id: chatId,
    },
  });
};

export const isChatOnCache = (chatId: string) => {
  return Boolean(
    client.readQuery({
      query: ChatMessagesGetDocument,
      variables: { data: { chatId } },
    })
  );
};
