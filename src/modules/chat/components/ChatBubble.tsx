import { ChatMessage } from '../../../api';
import { Box, Text } from '../../../components';
import { formatChatDate } from '../../../utils';
import { useAuth } from '../../auth';

export interface IChatBubble {
  message: ChatMessage;
}

export const ChatBubble: React.FC<IChatBubble> = ({ message }) => {
  const { userId } = useAuth();
  const isMy = message.fromId === userId;

  const renderDatetime = () => (
    <Text type="hint" color="text.secondary">
      {formatChatDate(message.createdAt)}
    </Text>
  );

  return (
    <Box
      row
      my={0.5}
      hcenter
      style={{ justifyContent: isMy ? 'flex-end' : 'flex-start' }}
    >
      {!!isMy && renderDatetime()}
      <Box
        mr={isMy ? 2 : 1}
        ml={isMy ? 1 : 2}
        p={2}
        bgColor="disabled"
        style={{ borderRadius: 12 }}
      >
        <Text>{message.text}</Text>
      </Box>
      {!!!isMy && renderDatetime()}
    </Box>
  );
};
