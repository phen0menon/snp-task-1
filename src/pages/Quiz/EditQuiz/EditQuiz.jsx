import React from 'react';
import PropTypes from 'prop-types';

import styles from './EditQuiz.scss';
import globalStyles from 'styles/global.scss';
import Button from 'components/Button/Button';
import QuizQuestion from './QuizQuestion';
import { Link } from 'react-router-dom';
import usePaginatedState from 'hooks/usePaginatedState';

const EditQuiz = ({ id, questions, title }) => {
  const {
    page: currentQuestionIndex,
    gotoPreviousPage: gotoPrevQuestion,
    gotoNextPage: gotoNextquestion,
    isFirstPage: isFirstQuestion,
    isLastPage: isLastQuestion,
  } = usePaginatedState(questions.length);

  const currentQuestionId = React.useMemo(
    () => (questions && questions[currentQuestionIndex]) || undefined,
    [questions, currentQuestionIndex]
  );

  return (
    <div className={globalStyles.container}>
      <div className={styles.inner}>
        <div className={styles.nav}>
          <div className={styles.header}>
            <div className={styles.backButton}>
              <Link to="/">&lt;</Link>
            </div>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.navButtons}>
            <Button onClick={gotoPrevQuestion} disabled={isFirstQuestion}>
              &lt;
            </Button>
            {currentQuestionIndex + 1} of {questions.length}
            <Button onClick={gotoNextquestion} disabled={isLastQuestion}>
              &gt;
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <QuizQuestion id={currentQuestionId} />
        </div>
      </div>
    </div>
  );
};

EditQuiz.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditQuiz;
