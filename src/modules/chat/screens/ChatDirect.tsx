import { useRoute } from '@react-navigation/native';
import {
  useChatMessageSendMutation,
  useChatMessagesGetQuery,
  useChatUserGetQuery,
  useResponse,
  UserPreview,
} from '../../../api';
import { StateHandler } from '../../../components';
import { Chat } from '../components';
import { ChatStackRouteProp } from '../navigator';

export const ChatDirect = () => {
  const {
    params: { id, chat },
  } = useRoute<ChatStackRouteProp<'ChatDirect'>>();
  const { onError } = useResponse();
  const chatId = (id ?? chat?._id) as string;

  const {
    data: userData,
    loading: isUserLoading,
    error: isUserError,
  } = useChatUserGetQuery({
    variables: { data: { id: chatId } },
    skip: !id,
  });

  const {
    data: messagesData,
    loading: isMessagesLoading,
    error: isMessagesError,
  } = useChatMessagesGetQuery({
    variables: { data: { chatId } },
    skip: !chatId,
  });

  const [sendMessage] = useChatMessageSendMutation();

  const isLoading = isUserLoading || isMessagesLoading;
  const isError = Boolean(isUserError || isMessagesError);

  const handleSendMessage = async (text: string) => {
    try {
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
    <StateHandler isLoading={isLoading} isError={isError}>
      <Chat
        id={chatId}
        user={(chat?.user ?? userData?.chatUserGet) as UserPreview}
        messages={messagesData?.chatMessagesGet ?? []}
        sendMessage={handleSendMessage}
      />
    </StateHandler>
  );
};
