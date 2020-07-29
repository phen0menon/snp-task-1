import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import globalStyles from 'styles/global.scss';

const AnswerInput = ({ className, ...restProps }) => {
  return (
    <input
      type="text"
      className={classNames([
        globalStyles.formTextarea,
        globalStyles.formTextareaSmall,
        className,
      ])}
      {...restProps}
    />
  );
};

AnswerInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

AnswerInput.defaultProps = {
  onKeyDown: null,
  className: null,
  placeholder: '',
  disabled: false,
};

export default React.memo(AnswerInput);
