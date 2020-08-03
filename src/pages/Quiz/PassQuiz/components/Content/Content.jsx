import React, { useContext, useEffect, createContext, useMemo } from 'react';
import useSelector from 'hooks/useSelector';

import ChoiceAnswerKind from '../ChoiceAnswerKind';
import NumericAnswerKind from '../NumericAnswerKind';
import ProceedButton from '../ProceedButton';

import { PassQuizContext } from '../../PassQuiz';
import { QUIZ_NUMBER_KIND, QUIZ_SINGLE_KIND } from '../../../constants';

import { getQuestionByIdSelector } from 'models/tests/questions/selectors';

import styles from './Content.scss';

export const PassQuizAnswerContext = createContext({
  userAnswer: null,
  setUserAnswer: null,
});

const Content = () => {
  const { currQuestionId, currQuestionIndex } = useContext(PassQuizContext);

  const { answer, answers, question_type: type, title } = useSelector(
    getQuestionByIdSelector,
    currQuestionId
  );

  // Takes value of type string or array of strings (ids)
  const [userAnswer, setUserAnswer] = React.useState(
    type === QUIZ_NUMBER_KIND ? '' : []
  );

  const isUserAnswered = useMemo(
    () =>
      userAnswer != null &&
      (type === QUIZ_NUMBER_KIND ? userAnswer !== '' : userAnswer.length),
    [userAnswer, type]
  );

  useEffect(() => {
    if (type === QUIZ_NUMBER_KIND) {
      setUserAnswer('');
    } else {
      setUserAnswer([]);
    }
  }, [type, currQuestionId, setUserAnswer]);

  return (
    <PassQuizAnswerContext.Provider
      value={{
        userAnswer,
        setUserAnswer,
      }}
    >
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.styles}>
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

export default Content;
