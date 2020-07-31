import { useState, useCallback } from 'react';

export default () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  return {
    isOpen,
    setOpen,
    toggle,
    open,
    close,
  };
};
