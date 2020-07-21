import { useState, useCallback } from 'react';

export default () => {
  const [isOpen, setOpen] = useState(false);
  const toggleModal = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  return {
    isOpen,
    setOpen,
    toggleModal,
    openModal,
    closeModal,
  };
};
