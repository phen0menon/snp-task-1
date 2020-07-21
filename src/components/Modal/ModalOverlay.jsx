/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { createPortal } from 'react-dom';
import { triggerEscAction } from 'utils/common';
import { ModalContext } from './Modal';
import PropTypes from 'prop-types';

import styles from './Modal.scss';

const ModalOverlay = ({ children }) => {
  const { close } = React.useContext(ModalContext);

  const closeModalByEsc = React.useCallback(
    event => triggerEscAction(event, close),
    [close]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', closeModalByEsc);
    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [closeModalByEsc]);

  const onOverlayClick = React.useCallback(
    event => {
      if (event.target === event.currentTarget) close();
    },
    [close]
  );

  return createPortal(
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      onClick={onOverlayClick}
    >
      <div className={styles['modal-window']}>{children}</div>
    </div>,
    document.getElementById('modals-view')
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
};

ModalOverlay.defaultProps = {
  children: '',
};

export default React.memo(ModalOverlay);
