import { useState } from 'react';

export const useModal = (initial = false) => {
  const [isOpen, setOpen] = useState(initial);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { isModalOpen: isOpen, openModal, closeModal };
};
