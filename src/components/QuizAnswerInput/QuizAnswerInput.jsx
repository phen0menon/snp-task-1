import React from 'react';
import PropTypes from 'prop-types';
import QuizInput from 'components/QuizInput/QuizInput';
import { isEnter } from 'utils/common';

const QuizAnswerInput = ({ text, setText, onSubmit, placeholder, created }) => {
  const onChange = React.useCallback(
    event => {
      setText(event.target.value);
    },
    [setText]
  );

  const onEnterPress = React.useCallback(
    evt => {
      if (onSubmit && isEnter(evt) && !!text) {
        onSubmit();
      }
    },
    [onSubmit, text]
  );

  React.useEffect(() => {
    if (created) {
      setText('');
    }
  }, [created, setText]);

  return (
    <QuizInput
      value={text}
      onChange={onChange}
      onKeyDown={onEnterPress}
      placeholder={placeholder}
      autoFocus
      required
    />
  );
};

QuizAnswerInput.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  created: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
};

QuizAnswerInput.defaultProps = {
  placeholder: '',
  onSubmit: null,
};

export default React.memo(QuizAnswerInput);
