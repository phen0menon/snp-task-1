import React from 'react';
import styles from './Checkbox.scss';
import classNames from 'classnames';

const Checkbox = props => {
  const input = React.createRef(null);

  const {
    id,
    name,
    required,
    readOnly,
    disabled,
    tabIndex,
    autoFocus,
    value,
    label,
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
          result[current] = restProps[current];
        }
        return result;
      }, {}),
    [restProps]
  );

  const cboxClassNames = classNames(styles['cbox'], {
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
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

export default Checkbox;
