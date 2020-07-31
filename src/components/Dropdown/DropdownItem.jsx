import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.scss';
import { DropdownContext } from './Dropdown';

const DropdownItem = ({ children, onClick }) => {
  const { close } = useContext(DropdownContext);
  const handleClick = useCallback(() => {
    close();
    onClick();
  }, [close, onClick]);
  return (
    <div className={styles.item} onClick={handleClick}>
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(DropdownItem);
