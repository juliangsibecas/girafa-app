import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

import { Box } from '../Box';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  height?: ViewStyle['height'];
  onClose: () => void;
};

export const BottomModal: React.FC<Props> = ({
  children,
  isOpen,
  height,
  onClose,
}) => (
  <Modal
    isVisible={isOpen}
    onSwipeComplete={() => onClose()}
    onBackdropPress={() => onClose()}
    swipeDirection={['down']}
    propagateSwipe={true}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <Box bgColor="background" borderRadius={2} px={4} pb={4} style={{ height }}>
      <Box center mt={2}>
        <Box width={4} height={0.5} borderRadius={1} bgColor="text.secondary" />
      </Box>
      <Box flexGrow={1} mt={2}>
        {children}
      </Box>
    </Box>
  </Modal>
);
