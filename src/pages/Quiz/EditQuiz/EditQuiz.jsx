import React from 'react';
import PropTypes from 'prop-types';

import styles from './EditQuiz.scss';
import QuizQuestion from './QuizQuestion';
import useSelector from 'hooks/useSelector';
import { getQuestionsByIdsSelector } from 'models/questions/selectors';
import QuestionsSidebar from 'components/QuestionsSidebar/QuestionsSidebar';

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
