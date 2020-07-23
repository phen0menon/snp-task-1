import React from 'react';
import { quizListSelector, quizAllIdsSelector } from 'models/quizzes/selectors';
import { useSelector } from 'react-redux';
import QuizCard from 'components/QuizCard';

import styles from './QuizList.scss';

const QuizList = () => {
  const quizList = useSelector(quizListSelector);
  const quizAllIds = useSelector(quizAllIdsSelector);

  const renderedQuizzes = React.useMemo(
    () =>
      quizList.map((quiz, index) => {
        return <QuizCard key={quiz.id} {...quiz} />;
      }),
    [quizList]
  );

  return <div className={styles.root}>{renderedQuizzes}</div>;
};

export default React.memo(QuizList);
