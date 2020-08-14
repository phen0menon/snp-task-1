import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import checkboxStyles from '../Checkbox/Checkbox.scss';
import styles from './Radio.scss';
import { getControlProps } from 'utils/common';

const Radio = ({
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
}) => {
  const input = React.useRef();

  const controlProps = useMemo(() => getControlProps(restProps), [restProps]);

  const radioClassNames = classNames(
    checkboxStyles.cbox,
    className,
    styles.radio,
    {
      [checkboxStyles.cboxChecked]: checked,
      [checkboxStyles.cboxDisabled]: disabled,
    }
  );

  return (
    <label className={checkboxStyles.cboxWrapper} style={style}>
      <span className={radioClassNames}>
        <input
          id={id}
          ref={input}
          name={name}
          type="radio"
          required={required}
          onChange={onChange}
          className={checkboxStyles.cboxInput}
          checked={checked}
          {...controlProps}
        />
        <span className={classNames(checkboxStyles.cboxInner, styles.inner)} />
      </span>
      {children && <span>{children}</span>}
    </label>
  );
};

Radio.propTypes = {
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

Radio.defaultProps = {
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

export default Radio;
