import React from 'react';
import PropTypes from 'prop-types';

import styles from '../FinalStats/FinalStats.scss';

const QuestionBlockNumeric = ({ answer, userAnswer }) => {
  return (
    <div className={styles.answer}>
      <div
        className={
          answer === parseInt(userAnswer, 10)
            ? styles.answerRight
            : styles.answerNotRight
        }
      >
        Your answer is {userAnswer}
      </div>

      <div className={styles.hint}>(the right one is {answer})</div>
    </div>
  );
};

QuestionBlockNumeric.propTypes = {
  answer: PropTypes.number.isRequired,
  userAnswer: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default QuestionBlockNumeric;
