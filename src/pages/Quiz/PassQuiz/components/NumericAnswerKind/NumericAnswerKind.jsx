import React, { useContext, useCallback } from 'react';
import { PassQuizAnswerContext } from '../Content/Content';
import QuizInput from 'components/QuizInput/QuizInput';

const NumericAnswerKind = () => {
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

export default NumericAnswerKind;
