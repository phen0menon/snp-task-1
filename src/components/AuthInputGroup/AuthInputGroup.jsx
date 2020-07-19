import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AuthInputGroup.module.css';
import Checkbox from 'components/Checkbox/Checkbox';

const AuthInputGroup = props => {
  const { wrapperClassName, label, ...restProps } = props;

  return (
    <div className={classNames(styles['input-group'], wrapperClassName)}>
      {restProps.type !== 'checkbox' ? (
        <>
          <label htmlFor={restProps.id} className={styles['input-group-label']}>
            {label}
          </label>
          <input className={styles['input-group-input']} {...restProps} />
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
};

AuthInputGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  wrapperClassName: '',
};

export default AuthInputGroup;
