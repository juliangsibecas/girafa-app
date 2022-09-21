import React from 'react';
import { useTranslation } from 'react-i18next';
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
}) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={isOpen}>
      <Box bgColor="background" borderRadius={2} py={4} px={4}>
        <Text type="h3" textCenter>
          {title}
        </Text>
        <Text mt={2} textCenter>
          {body}
        </Text>
        <Box flex row center mt={2}>
          <Button secondary small mr={2} onPress={onCancel} flexGrow={1}>
            {cancel ?? t('general.cancel')}
          </Button>
          <Button small onPress={onConfirm} flexGrow={1}>
            {confirm ?? t('general.confirm')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
