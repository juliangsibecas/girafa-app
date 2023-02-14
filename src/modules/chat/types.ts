import { ChatPreview } from '../../api';

export type ChatPreviewReadable = ChatPreview & { isUnread: boolean };

export type ChatContextValues = {
  chats: Array<ChatPreviewReadable>;
  unreadChatsCount: number;
  isChatsLoading: boolean;
  isChatsError: boolean;

  updateChatRead: ({
    chatId,
    lastMessageDate,
  }: {
    chatId: string;
    lastMessageDate: Date;
  }) => void;
};
