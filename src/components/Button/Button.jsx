import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.scss';
import variants from './Variants.scss';
import { Link } from 'react-router-dom';

const Button = ({ className, variant, children, to, ...restProps }) => {
  const btnVariant = useMemo(() => {
    if (!Object.getOwnPropertyDescriptor(variants, variant)) {
      console.error(`Button: there is no button variant named as ${variant}`);
      return variants.default;
    }
    return variants[variant];
  }, [variant]);

  const btnClassName = useMemo(
    () => classNames([styles.button, btnVariant, className]),
    [btnVariant, className]
  );

  return to ? (
    <Link to={to} className={btnClassName}>
      {children}
    </Link>
  ) : (
    <button className={btnClassName} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['reset', 'submit', 'button']),
  children: PropTypes.node,
  onClick: PropTypes.func,

  // Link props
  to: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  variant: 'default',
  style: {},
  type: 'button',
  children: '',
  onClick: null,
  to: undefined,
};

export default React.memo(Button);
