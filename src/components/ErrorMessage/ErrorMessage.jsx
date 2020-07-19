import React from 'react';
import styles from './ErrorMessage.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ErrorMessage = ({ children, centered }) => (
  <div
    className={classNames(styles.error, {
      [styles['error-centered']]: centered,
    })}
  >
    <div className={styles['error-inner']}>{children}</div>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string,
  ]).isRequired,
  centered: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  centered: false,
};

export default ErrorMessage;
