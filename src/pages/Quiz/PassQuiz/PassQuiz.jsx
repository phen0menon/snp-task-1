import React, { useState, createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Content from './components/Content';

import styles from './PassQuiz.scss';

export const PassQuizContext = createContext({
  quiz: {},
  currQuestionId: null,
  currQuestionIndex: null,
  setCurrQuestionId: null,
});

const PassQuiz = quiz => {
  const { id, title, questions } = quiz;

  const [currQuestionId, setCurrQuestionId] = useState(questions[0]);

  const currQuestionIndex = useMemo(() => questions.indexOf(currQuestionId), [
    questions,
    currQuestionId,
  ]);

  const toNextQuestion = useCallback(() => {
    if (currQuestionIndex === questions.length) {
      throw new Error('Question index is out of bound');
    }
    setCurrQuestionId(questions[currQuestionIndex + 1]);
  }, [currQuestionIndex, questions, setCurrQuestionId]);

  return (
    <PassQuizContext.Provider
      value={{
        quiz,
        currQuestionId,
        currQuestionIndex,
        toNextQuestion,
      }}
    >
      <div className={styles.root}>
        <div className={styles.inner}>
          <Header />
          <Content />
        </div>
      </div>
    </PassQuizContext.Provider>
  );
};

PassQuiz.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

export default PassQuiz;
