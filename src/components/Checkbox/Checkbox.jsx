import React from 'react';
import styles from './Checkbox.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const input = React.useRef();

  const {
    id,
    name,
    required,
    readOnly,
    disabled,
    tabIndex,
    autoFocus,
    value,
    style,
    value: checked,
    children,
    onClick,
    onChange,
    ...restProps
  } = props;

  const controlProps = React.useMemo(
    () =>
      Object.keys(restProps).reduce((result, current) => {
        const subkey = current.substr(0, 5);
        if (subkey === 'aria-' || subkey === 'data-' || current === 'role') {
          // eslint-disable-next-line no-param-reassign
          result[current] = restProps[current];
        }
        return result;
      }, {}),
    [restProps]
  );

  const cboxClassNames = classNames(styles.cbox, {
    [styles['cbox-checked']]: checked,
    [styles['cbox-disabled']]: disabled,
  });

  return (
    <label className={styles['cbox-wrapper']} style={style}>
      <span className={cboxClassNames}>
        <input
          name={name}
          id={id}
          type="checkbox"
          required={required}
          onChange={onChange}
          ref={input}
          className={styles['cbox-input']}
          {...controlProps}
        />
        <span className={styles['cbox-inner']} />
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  autoFocus: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.element,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  required: false,
  readOnly: false,
  disabled: false,
  autoFocus: false,
  children: '',
  style: {},
  tabIndex: -1,
  onClick: null,
};

export default Checkbox;
