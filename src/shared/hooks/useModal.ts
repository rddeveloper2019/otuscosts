import { useState } from 'react';

export type ModalHookOptions = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};
export const useModal = (): ModalHookOptions => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    isModalOpen,
  } as ModalHookOptions;
};
