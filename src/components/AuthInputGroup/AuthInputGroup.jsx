import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AuthInputGroup.module.css';
import Checkbox from 'components/Checkbox/Checkbox';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const AuthInputGroup = props => {
  const { wrapperClassName, label, errors, ...restProps } = props;

  const errorMessage = React.useMemo(
    () => (errors.length ? errors.join('; ') : ''),
    [errors]
  );

  return (
    <div className={classNames(styles['input-group'], wrapperClassName)}>
      {restProps.type !== 'checkbox' ? (
        <>
          <label htmlFor={restProps.id} className={styles['input-group-label']}>
            {label}
          </label>
          <input className={styles['input-group-input']} {...restProps} />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
      ) : (
        <Checkbox {...restProps}>{label}</Checkbox>
      )}
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
  wrapperClassName: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

AuthInputGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  wrapperClassName: '',
  errors: '',
};

export default AuthInputGroup;
