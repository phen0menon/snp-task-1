import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.scss';
import variants from './Variants.scss';

const Button = ({ className, variant, children, ...restProps }) => {
  const btnVariant = React.useMemo(() => {
    if (!Object.getOwnPropertyDescriptor(variants, variant)) {
      console.error(`Button: there is no button variant named as ${variant}`);
      return variants.default;
    }
    return variants[variant];
  }, [variant]);

  const btnClassName = React.useMemo(
    () => classNames([styles.button, btnVariant, className]),
    [btnVariant, className]
  );

  return (
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
};

Button.defaultProps = {
  className: '',
  variant: 'default',
  style: {},
  type: 'button',
  children: '',
  onClick: null,
};

export default React.memo(Button);
