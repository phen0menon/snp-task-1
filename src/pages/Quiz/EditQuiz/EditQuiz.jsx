import React from 'react';
import PropTypes from 'prop-types';

import styles from './EditQuiz.scss';
import globalStyles from 'styles/global.scss';
import Button from 'components/Button/Button';
import QuizQuestion from './QuizQuestion';
import { Link } from 'react-router-dom';
import usePaginatedState from 'hooks/usePaginatedState';
import useSelector from 'hooks/useSelector';
import { getQuestionsByIdsSelector } from 'models/questions/selectors';
import QuestionsSidebar from './QuestionsSidebar';

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
};

export default EditQuiz;
