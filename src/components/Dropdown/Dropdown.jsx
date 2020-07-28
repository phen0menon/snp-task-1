import React from 'react';
import styles from './Dropdown.scss';

const DropdownContext = React.createContext({
  isOpen: false,
  open: () => null,
  close: () => null,
});

const Dropdown = ({ children, isOpen, open, close }) => {
  const onOverlayClick = React.useCallback(() => {
    close();
  }, [close]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', onOverlayClick);
    } else {
      document.removeEventListener('click', onOverlayClick);
    }
  }, [isOpen, onOverlayClick]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      <div className={styles.root}>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Items = ({ children }) => {
  const { isOpen } = React.useContext(DropdownContext);
  return isOpen ? <ul className={styles.items}>{children}</ul> : null;
};

Dropdown.Item = ({ onClick, children }) => {
  const { close } = React.useContext(DropdownContext);

  const handleItemClick = React.useCallback(event => {
    close();
    onClick(event);
  });

  return (
    <li className={styles.item} onClick={handleItemClick}>
      {children}
    </li>
  );
};

export default Dropdown;
