import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, Text } from '../../../components';
import { FontFamily } from '../../../theme';
import { formatDateTime } from '../../../utils';

import { UserAvatar } from '../../user/components';
import { ChatPreviewReadable } from '../types';

interface IChatRow {
  chat: ChatPreviewReadable;
  onPress: () => void;
}

export const ChatRow: React.FC<IChatRow> = ({ chat, onPress: handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Box row hcenter my={0.5}>
        <UserAvatar
          id={chat.user.pictureId}
          height={6}
          width={6}
          placeholderSize={4}
        />
        <Box ml={2} flex={1}>
          <Box row hcenter>
            <Text type="h4" fontFamily={FontFamily.BOLD} flex={1}>
              {chat.user.nickname}
            </Text>
            <Box
              bgColor={chat.isUnread ? 'primary' : undefined}
              py={0.5}
              px={1}
              borderRadius={2}
            >
              <Text
                type="hint"
                color={chat.isUnread ? 'background.main' : undefined}
              >
                {formatDateTime(chat.lastMessage.createdAt)}
              </Text>
            </Box>
          </Box>
          <Text>{chat.lastMessage.text}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
