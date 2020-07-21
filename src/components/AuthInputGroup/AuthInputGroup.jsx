import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthInputGroup.module.css';
import Checkbox from 'components/Checkbox/Checkbox';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const AuthInputGroup = ({ label, error, ...restProps }) => {
  return (
    <div className={styles.inputGroup}>
      {restProps.type !== 'checkbox' ? (
        <>
          <label htmlFor={restProps.id} className={styles.inputGroupLabel}>
            {label}
          </label>
          <input className={styles.inputGroupInput} {...restProps} />
        </>
      ) : (
        <Checkbox {...restProps}>{label}</Checkbox>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

AuthInputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

AuthInputGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  error: null,
};

export default AuthInputGroup;
