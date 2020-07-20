import React from 'react';
import ModalOverlay from './ModalOverlay';
import closeIcon from 'images/close-icon.svg';
import PropTypes from 'prop-types';

import styles from './Modal.scss';
import Button from 'components/Button';

export const ModalContext = React.createContext({
  isOpen: false,
  open: () => null,
  close: () => null,
});

const Modal = React.memo(({ children, isOpen, close, open }) => {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, close, open }}>
      <ModalOverlay>{children}</ModalOverlay>
    </ModalContext.Provider>
  );
});

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: '',
};

Modal.Header = React.memo(({ children }) => {
  const { close } = React.useContext(ModalContext);

  return (
    <div className={styles['modal-header']}>
      <div className={styles['modal-header-content']}>{children}</div>
      <div className={styles['modal-header-close']}>
        <Button type="button" title="close modal" onClick={close}>
          <img src={closeIcon} height={20} width={20} alt="close icon" />
        </Button>
      </div>
    </div>
  );
});

Modal.Header.propTypes = {
  children: PropTypes.node,
};

Modal.Header.defaultProps = {
  children: '',
};

Modal.Body = React.memo(({ children }) => (
  <div className={styles['modal-body']}>{children}</div>
));

Modal.Body.propTypes = {
  children: PropTypes.node,
};

Modal.Body.defaultProps = {
  children: '',
};

Modal.Footer = React.memo(({ proceedHandler, children }) => {
  const { close } = React.useContext(ModalContext);

  const contents = React.useMemo(() => {
    if (children) return children;
    return (
      <>
        <Button type="submit" variant="success" onClick={proceedHandler}>
          Proceed
        </Button>
        <Button type="button" variant="secondary" onClick={close}>
          Cancel
        </Button>
      </>
    );
  }, [children, proceedHandler, close]);

  return (
    <div className={styles['modal-footer']}>
      <div className={styles['modal-footer-content']}>{contents}</div>
    </div>
  );
});

Modal.Footer.propTypes = {
  proceedHandler: PropTypes.func,
  children: PropTypes.node,
};

Modal.Footer.defaultProps = {
  proceedHandler: null,
  children: '',
};

export default Modal;
