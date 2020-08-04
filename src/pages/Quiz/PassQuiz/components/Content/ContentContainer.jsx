import React, { useContext, useState, useCallback } from 'react';
import { QuizDataContext } from '../../PassQuiz';
import Content from './Content';
import FinalStats from '../FinalStats/FinalStats';

const ContentContainer = () => {
  const { questions } = useContext(QuizDataContext);

  const [answersByQuestionId, setAnswersByQuestionId] = useState({});
  const [finished, setFinished] = React.useState(false);

  const addAnswer = useCallback(
    (questionId, answer) =>
      setAnswersByQuestionId({
        ...answersByQuestionId,
        [questionId]: answer,
      }),
    [answersByQuestionId, setAnswersByQuestionId]
  );

  const finish = useCallback(() => setFinished(true), [setFinished]);

  return <Content addAnswer={addAnswer} finish={finish} />;
};

export default ContentContainer;
