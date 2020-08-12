import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useSelector from 'hooks/useSelector';

import { getAnswersByIdsSelector } from 'models/tests/answers/selectors';

import checkIcon from 'images/check-icon.svg';
import timesIcon from 'images/times-icon.svg';

import styles from '../FinalStats/FinalStats.scss';

const QuestionBlockChoice = ({ answers, userAnswer }) => {
  const answersEntities = useSelector(getAnswersByIdsSelector, answers);
  const renderedAnswers = useMemo(
    () =>
      answersEntities.map(answer => (
        <div
          className={classNames(
            styles.answer,
            answer.is_right ? styles.answerRight : styles.answerNotRight
          )}
          key={`${answer.id}${answer.text}`}
        >
          <div className={styles.answerTitle}>{answer.text}</div>
          {userAnswer.includes(answer.id) && (
            <div>
              <img
                src={answer.is_right ? checkIcon : timesIcon}
                width={answer.is_right ? 20 : 16}
                alt="correct or incorrect answer"
              />
            </div>
          )}
        </div>
      )),
    [answersEntities, userAnswer]
  );
  return renderedAnswers;
};

QuestionBlockChoice.propTypes = {
  answers: PropTypes.array,
  userAnswer: PropTypes.array,
};

export default QuestionBlockChoice;
