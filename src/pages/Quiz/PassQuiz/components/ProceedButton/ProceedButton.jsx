import React, { useContext, useMemo, useCallback } from 'react';
import { PassQuizContext } from '../../PassQuiz';
import Button from 'components/Button/Button';

import rightArrow from 'images/right-arrow-icon.svg';
import styles from './ProceedButton.scss';

const ProceedButton = () => {
  const {
    toNextQuestion,
    finishQuiz,
    quiz: { questions },
    currQuestionIndex,
  } = useContext(PassQuizContext);

  const isLastQuestion = useMemo(() => questions.length === currQuestionIndex, [
    questions,
    currQuestionIndex,
  ]);
  const onClick = useCallback(isLastQuestion ? finishQuiz : toNextQuestion, [
    isLastQuestion,
    finishQuiz,
    toNextQuestion,
  ]);

  return (
    <Button variant="success" className={styles.root} onClick={onClick}>
      next <img src={rightArrow} width="20" alt="go to next page" />
    </Button>
  );
};

export default ProceedButton;
