import React from 'react';
import styles from './ErrorMessage.scss';
import PropTypes from 'prop-types';

const ErrorMessage = ({ children }) => (
  <div className={styles.error}>
    <div className={styles['error-inner']}>{children}</div>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorMessage;
