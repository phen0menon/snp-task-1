import React from 'react';
import PropTypes from 'prop-types';

import styles from './QuestionsSidebar.scss';
import QuestionsSidebarItem from '../QuestionsSidebarItem';

const QuestionsSidebar = ({ questions, currentQuestionId, onItemClick }) => {
  const renderedQuestionList = React.useMemo(
    () =>
      questions.map((question, index) => (
        <QuestionsSidebarItem
          key={question.id}
          questionItem={question}
          isActive={currentQuestionId === question.id}
          onClick={onItemClick}
          index={index}
        />
      )),
    [questions, currentQuestionId, onItemClick]
  );

  return (
    <div className={styles.root}>
      <div className={styles.items}>{renderedQuestionList}</div>

      <div className={styles.floating}>
        <button className={styles.floatingButton}>+</button>
      </div>
    </div>
  );
};

QuestionsSidebar.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionId: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default React.memo(QuestionsSidebar);
