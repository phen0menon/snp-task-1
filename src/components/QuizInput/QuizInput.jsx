import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import globalStyles from 'styles/global.scss';

const QuizInput = ({ className, type, ...restProps }) => {
  return (
    <input
      type={type}
      className={classNames([
        globalStyles.formTextarea,
        globalStyles.formTextareaSmall,
        className,
      ])}
      {...restProps}
    />
  );
};

QuizInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

QuizInput.defaultProps = {
  onKeyDown: null,
  className: null,
  placeholder: '',
  disabled: false,
  type: 'text',
  value: '',
};

export default React.memo(QuizInput);
