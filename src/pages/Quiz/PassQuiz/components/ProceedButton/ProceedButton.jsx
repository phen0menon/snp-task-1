import React, { useContext } from 'react';
import Button from 'components/Button/Button';

import { QuizDataContext } from '../../PassQuiz';
import { PassQuizAnswerContext } from '../Content/Content';

import rightArrow from 'images/right-arrow-icon.svg';
import styles from './ProceedButton.scss';

const ProceedButton = () => {
  const { questions } = useContext(QuizDataContext);
  const { toNextQuestion, currQuestionIndex } = useContext(
    PassQuizAnswerContext
  );

  const isLastQuestion = questions.length - 1 === currQuestionIndex;

  return (
    <Button variant="success" className={styles.root} onClick={toNextQuestion}>
      {!isLastQuestion ? 'Next' : 'Finish'}
      <img src={rightArrow} width="20" alt="go to next page" />
    </Button>
  );
};

export default ProceedButton;
