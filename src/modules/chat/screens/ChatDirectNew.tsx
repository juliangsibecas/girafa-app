import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  useChatCreateMutation,
  useChatMessageSendMutation,
  useChatMessagesGetQuery,
  useResponse,
} from '../../../api';
import { Chat } from '../components';
import { ChatStackRouteProp } from '../navigator';
import { addChatToCache } from '../utils';

export const ChatDirectNew = () => {
  const {
    params: { user },
  } = useRoute<ChatStackRouteProp<'ChatDirectNew'>>();
  const { onError } = useResponse();
  const [chatId, setChatId] = useState('');
  const { data } = useChatMessagesGetQuery({
    variables: { data: { chatId } },
    skip: !chatId,
  });
  const [createChat] = useChatCreateMutation();
  const [sendMessage] = useChatMessageSendMutation();

  const handleSendMessage = async (text: string) => {
    let id: string | undefined = chatId;

    try {
      if (!id) {
        const res = await createChat({
          variables: { data: { withId: user._id, messageText: text } },
        });

        if (res.data?.chatCreate) {
          setChatId(res.data.chatCreate._id);
          addChatToCache(res.data.chatCreate);
        } else {
          throw new Error();
        }
      } else {
        await sendMessage({ variables: { data: { chatId, text } } });
      }
    } catch (e) {
      onError();
    }
  };

  return (
    <Chat
      id={chatId}
      user={user}
      messages={data?.chatMessagesGet ?? []}
      sendMessage={handleSendMessage}
    />
  );
};
