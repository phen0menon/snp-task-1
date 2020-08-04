import React, {
  useContext,
  useEffect,
  useCallback,
  createContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';

import ChoiceAnswerKind from '../ChoiceAnswerKind';
import NumericAnswerKind from '../NumericAnswerKind';
import ProceedButton from '../ProceedButton';

import { QuizDataContext } from '../../PassQuiz';
import { QUIZ_NUMBER_KIND, QUIZ_SINGLE_KIND } from '../../../constants';

import { getQuestionByIdSelector } from 'models/tests/questions/selectors';

import styles from './Content.scss';

export const PassQuizAnswerContext = createContext({
  userAnswer: null,
  setUserAnswer: null,
  currQuestionId: null,
  currQuestionIndex: null,
  toNextQuestion: null,
});

const Content = ({ addAnswer, finish }) => {
  const { questions } = useContext(QuizDataContext);

  const [currQuestionId, setCurrQuestionId] = useState(questions[0]);

  const currQuestionIndex = useMemo(() => questions.indexOf(currQuestionId), [
    questions,
    currQuestionId,
  ]);

  const { answer, answers, question_type: type, title } = useSelector(
    getQuestionByIdSelector,
    currQuestionId
  );

  // Takes value of type string or array of strings (ids)
  const [userAnswer, setUserAnswer] = useState(
    type === QUIZ_NUMBER_KIND ? '' : []
  );

  const resetUserInput = useCallback(() => {
    if (type === QUIZ_NUMBER_KIND) {
      setUserAnswer('');
    } else {
      setUserAnswer([]);
    }
  }, [type, setUserAnswer]);

  const toNextQuestion = useCallback(() => {
    addAnswer(currQuestionId, userAnswer);

    if (currQuestionIndex === questions.length - 1) {
      finish();
      return;
    }

    setCurrQuestionId(questions[currQuestionIndex + 1]);
    resetUserInput();
  }, [
    questions,
    currQuestionIndex,
    currQuestionId,
    userAnswer,
    setCurrQuestionId,
    finish,
    addAnswer,
    resetUserInput,
  ]);

  const isUserAnswered = useMemo(
    () =>
      userAnswer != null &&
      (type === QUIZ_NUMBER_KIND ? userAnswer !== '' : userAnswer.length),
    [userAnswer, type]
  );

  useEffect(() => {
    resetUserInput();
  }, [resetUserInput]);

  return (
    <PassQuizAnswerContext.Provider
      value={{
        userAnswer,
        setUserAnswer,
        currQuestionId,
        currQuestionIndex,
        toNextQuestion,
      }}
    >
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            {currQuestionIndex + 1}. {title}
          </div>
          <div className={styles.next}>
            {isUserAnswered ? <ProceedButton /> : null}
          </div>
        </div>
        <div className={styles.content}>
          {type === QUIZ_NUMBER_KIND ? (
            <NumericAnswerKind answer={answer} />
          ) : (
            <ChoiceAnswerKind
              answers={answers}
              isSingle={type === QUIZ_SINGLE_KIND}
            />
          )}
        </div>
      </div>
    </PassQuizAnswerContext.Provider>
  );
};

Content.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
};

export default Content;
