import React from 'react';
import Modal from 'react-native-modal';
import { Box } from '../Box';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BottomModal: React.FC<Props> = ({ children, isOpen, onClose }) => (
  <Modal
    isVisible={isOpen}
    onSwipeComplete={() => onClose()}
    onBackdropPress={() => onClose()}
    swipeDirection={['down']}
    propagateSwipe={true}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <Box bgColor="background" borderRadius={2} px={4} pb={4}>
      <Box flex center mt={2}>
        <Box width={4} height={0.5} borderRadius={1} bgColor="text.secondary" />
      </Box>
      <Box mt={2}>{children}</Box>
    </Box>
  </Modal>
);
