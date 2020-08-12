import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { PassQuizAnswerContext } from '../Content/Content';
import QuizInput from 'components/QuizInput/QuizInput';

const NumericAnswerKind = ({ answer }) => {
  const { userAnswer, setUserAnswer } = useContext(PassQuizAnswerContext);

  const onChange = useCallback(evt => setUserAnswer(evt.target.value), [
    setUserAnswer,
  ]);

  return (
    <QuizInput
      value={userAnswer}
      onChange={onChange}
      placeholder="Enter your answer"
    />
  );
};

NumericAnswerKind.propTypes = {
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default NumericAnswerKind;
