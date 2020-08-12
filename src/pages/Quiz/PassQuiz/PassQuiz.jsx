import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Content from './components/Content';

import styles from './PassQuiz.scss';

export const QuizDataContext = createContext({
  id: null,
  title: null,
  created_at: null,
  questions: [],
});

const PassQuiz = quiz => {
  return (
    <QuizDataContext.Provider value={quiz}>
      <div className={styles.root}>
        <div className={styles.inner}>
          <Header />
          <Content />
        </div>
      </div>
    </QuizDataContext.Provider>
  );
};

PassQuiz.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

export default PassQuiz;
