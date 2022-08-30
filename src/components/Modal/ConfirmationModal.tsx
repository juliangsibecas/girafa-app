import React from 'react';
import Modal from 'react-native-modal';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

type Props = {
  isOpen: boolean;

  title: string;
  body: string;
  confirm?: string;
  cancel?: string;

  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  title,
  body,
  confirm,
  cancel,
  onConfirm,
  onCancel,
}) => (
  <Modal isVisible={isOpen}>
    <Box bgColor="background" borderRadius={2} py={4} px={4}>
      <Text type="h3" textCenter>
        {title}
      </Text>
      <Text mt={2} textCenter>
        {body}
      </Text>
      <Button small mt={2} onPress={onConfirm}>
        {confirm ?? 'Confirmar'}
      </Button>
      <Button secondary small mt={1} onPress={onCancel}>
        {cancel ?? 'Cancelar'}
      </Button>
    </Box>
  </Modal>
);
