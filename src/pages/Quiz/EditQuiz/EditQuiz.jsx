import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getQuestionsByIdsSelector } from 'models/tests/questions/selectors';
import QuestionsSidebar from 'components/QuestionsSidebar/QuestionsSidebar';
import QuizQuestion from '../components/QuizQuestion';

import styles from './EditQuiz.scss';
import { QuizModifyContext } from './EditQuizContainer';

const EditQuiz = ({ questions, title }) => {
  const { quizId } = React.useContext(QuizModifyContext);
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
          questions={questionList}
          currentQuestionId={currentQuestionId}
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
  questions: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default EditQuiz;
