import React from 'react';

import { ConfirmationModal } from '../components/Modal/ConfirmationModal';

import { useModal } from './useModal';

interface Props {
  isOpen?: boolean;

  title: string;
  body: string;

  confirm?: string;
  cancel?: string;

  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmationModal = (props: Props) => {
  const { isModalOpen, openModal, closeModal } = useModal(props.isOpen);

  return [
    <ConfirmationModal
      {...props}
      isOpen={isModalOpen}
      onConfirm={() => {
        props.onConfirm?.();
        closeModal();
      }}
      onCancel={() => {
        props.onCancel?.();
        closeModal();
      }}
    />,
    openModal,
  ];
};
