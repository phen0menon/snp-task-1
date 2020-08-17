import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useSelector from 'hooks/useSelector';

import Button from 'components/Button/Button';
import QuestionBlockNumeric from '../QuestionBlockNumeric/QuestionBlockNumeric';
import QuestionBlockChoice from '../QuestionBlockChoice/QuestionBlockChoice';

import { getQuestionsByIdsSelector } from 'models/tests/questions/selectors';
import { QUIZ_NUMBER_KIND } from '../../../constants';

import styles from './FinalStats.scss';

const FinalStats = ({ answers, questions }) => {
  const questionsEntities = useSelector(getQuestionsByIdsSelector, questions);

  const renderedQuestions = useMemo(
    () =>
      questionsEntities.map((question, index) => (
        <div
          className={classNames(styles.question, {
            [styles.noGutter]: index === 0,
          })}
          key={question.id}
        >
          <div className={styles.questionTitle}>
            {index + 1}. {question.title}
          </div>
          <div className={styles.answers}>
            {question.question_type === QUIZ_NUMBER_KIND ? (
              <QuestionBlockNumeric
                answer={question.answer}
                userAnswer={answers[question.id]}
              />
            ) : (
              <QuestionBlockChoice
                answers={question.answers}
                userAnswer={answers[question.id]}
              />
            )}
          </div>
        </div>
      )),
    [answers, questionsEntities]
  );

  return (
    <div className={styles.root}>
      <div className={styles.title}>RESULTS</div>
      <div className={styles.content}>{renderedQuestions}</div>
      <div className={styles.footer}>
        <Button variant="success" to="/">
          Back to all tests
        </Button>
      </div>
    </div>
  );
};

FinalStats.propTypes = {
  answers: PropTypes.object.isRequired,
  questions: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FinalStats;
