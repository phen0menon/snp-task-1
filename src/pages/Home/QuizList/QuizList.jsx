import React from 'react';
import { quizListSelector } from 'models/tests/quizzes/selectors';
import useSelector from 'hooks/useSelector';
import QuizCard from 'components/QuizCard';

import styles from './QuizList.scss';

const QuizList = () => {
  const quizList = useSelector(quizListSelector);

  const renderedQuizzes = React.useMemo(
    () =>
      quizList.map(quiz => {
        return <QuizCard key={quiz.id} {...quiz} />;
      }),
    [quizList]
  );

  return <div className={styles.root}>{renderedQuizzes}</div>;
};

export default React.memo(QuizList);
