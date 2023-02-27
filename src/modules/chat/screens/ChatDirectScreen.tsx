import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  useChatCreateMutation,
  useChatGetIdByUserIdQuery,
  useChatMessageSendMutation,
  useChatMessagesGetQuery,
  useChatUserGetQuery,
  useResponse,
  UserPreview,
} from '../../../api';
import { Container, StateHandler } from '../../../components';
import { useEffectExceptOnMount } from '../../../hooks';
import { Chat } from '../components';
import { ChatStackRouteProp } from '../navigator';
import { addChatToCache } from '../utils';

export const ChatDirectScreen = () => {
  const {
    params: { id, chat, user },
  } = useRoute<ChatStackRouteProp<'ChatDirect'>>();
  const { onError } = useResponse();
  const [chatId, setChatId] = useState<string | undefined>(id ?? chat?._id);
  const [sendMessage] = useChatMessageSendMutation();
  const [createChat] = useChatCreateMutation();

  // From notification
  const {
    data: userData,
    loading: isUserLoading,
    error: isUserError,
  } = useChatUserGetQuery({
    variables: { data: { id: chatId! } },
    skip: !id,
  });

  // From profile
  const {
    data: getIdData,
    loading: isIdLoading,
    error: isIdError,
  } = useChatGetIdByUserIdQuery({
    variables: { data: { userId: user?._id! } },
    skip: Boolean(chatId),
  });

  // From all
  const {
    data: messagesData,
    loading: isMessagesLoading,
    error: isMessagesError,
  } = useChatMessagesGetQuery({
    variables: { data: { chatId: chatId! } },
    skip: !chatId,
  });

  const isLoading = isIdLoading || isUserLoading || isMessagesLoading;
  const isError = Boolean(isIdError || isUserError || isMessagesError);

  useEffect(() => {
    if (getIdData && getIdData.chatGetIdByUserId) {
      setChatId(getIdData.chatGetIdByUserId);
    }
  }, [getIdData]);

  const handleSendMessage = async (text: string) => {
    try {
      if (!chatId) {
        if (!user) {
          throw new Error();
        }

        const res = await createChat({
          variables: { data: { withId: user._id, messageText: text } },
        });

        if (res.data?.chatCreate) {
          setChatId(res.data.chatCreate._id);
          addChatToCache(res.data.chatCreate);

          return;
        }

        throw new Error();
      }

      const res = await sendMessage({
        variables: { data: { chatId, text } },
      });

      if (!res.data?.chatMessageSend) {
        throw new Error();
      }
    } catch (e) {
      onError();
    }
  };

  return (
    <Container headerPlaceholder noBottomGradient>
      <StateHandler isLoading={isLoading} isError={isError}>
        <Chat
          id={chatId!}
          user={(user ?? chat?.user ?? userData?.chatUserGet) as UserPreview}
          messages={messagesData?.chatMessagesGet ?? []}
          sendMessage={handleSendMessage}
        />
      </StateHandler>
    </Container>
  );
};
