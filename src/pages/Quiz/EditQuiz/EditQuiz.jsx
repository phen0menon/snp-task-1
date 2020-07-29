import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getQuestionsByIdsSelector } from 'models/tests/questions/selectors';
import QuestionsSidebar from 'components/QuestionsSidebar/QuestionsSidebar';
import QuizQuestion from '../components/QuizQuestion';

import styles from './EditQuiz.scss';

const EditQuiz = ({ id, questions, title }) => {
  const questionList = useSelector(getQuestionsByIdsSelector, questions);

  const [currentQuestionId, setCurrentQuestionId] = React.useState(
    questionList[0].id
  );

  const onQuestionSidebarItemClick = React.useCallback(
    questionId => setCurrentQuestionId(questionId),
    [setCurrentQuestionId]
  );

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <QuestionsSidebar
          currentQuizId={id}
          currentQuestionId={currentQuestionId}
          questions={questionList}
          onItemClick={onQuestionSidebarItemClick}
        />
      </div>

      <div className={styles.content}>
        <QuizQuestion id={currentQuestionId} />
      </div>
    </div>
  );
};

EditQuiz.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  questions: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default EditQuiz;
