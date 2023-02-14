import { gql } from '@apollo/client';
import {
  ChatFindDocument,
  ChatMessagesGetDocument,
  ChatNewMessageResponse,
  ChatPreview,
} from '../../api';
import { client } from '../../apollo';

export const addChatToCache = (chat: ChatPreview) => {
  const data = client.readQuery({ query: ChatFindDocument });

  client.writeQuery({
    query: ChatFindDocument,
    data: {
      chatFind: [chat, ...data.chatFind],
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
  const queryRes = client.readQuery({
    query: ChatMessagesGetDocument,
    variables: { data: { chatId: data.chatId } },
  });

  client.writeQuery({
    query: ChatMessagesGetDocument,
    data: {
      chatMessagesGet: [...queryRes.chatMessagesGet, data],
    },
    variables: {
      data: {
        chatId: data.chatId,
      },
    },
  });
};

export const addLastMessageToCache = (data: ChatNewMessageResponse) => {
  client.writeQuery({
    query: gql`
      query writeChat($id: String!) {
        chatList(id: $id) {
          _id
          lastMessage
        }
      }
    `,
    data: {
      chatList: {
        __typename: 'ChatPreview',
        _id: data.chatId,
        lastMessage: data.text,
      },
    },
    variables: {
      id: data.chatId,
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
