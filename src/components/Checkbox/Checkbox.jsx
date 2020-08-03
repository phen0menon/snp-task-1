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
    className,
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

  const cboxClassNames = classNames(styles.cbox, className, {
    [styles.cboxChecked]: checked,
    [styles.cboxDisabled]: disabled,
  });

  return (
    <label className={styles.cboxWrapper} style={style}>
      <span className={cboxClassNames}>
        <input
          name={name}
          id={id}
          type="checkbox"
          required={required}
          onChange={onChange}
          ref={input}
          className={styles.cboxInput}
          {...controlProps}
        />
        <span className={styles.cboxInner} />
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  autoFocus: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  name: '',
  id: '',
  className: '',
  required: false,
  readOnly: false,
  disabled: false,
  autoFocus: false,
  children: '',
  style: {},
  tabIndex: -1,
  onClick: null,
  onChange: null,
};

export default Checkbox;
