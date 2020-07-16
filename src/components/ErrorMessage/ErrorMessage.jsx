import React from 'react';
import styles from './ErrorMessage.scss';

const ErrorMessage = ({ children }) => (
  <div className={styles['error']}>
    <div className={styles['error-inner']}>{children}</div>
  </div>
);

export default ErrorMessage;
