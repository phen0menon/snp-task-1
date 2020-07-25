import React from 'react';
import classNames from 'classnames';

import styles from './QuestionsSidebar.scss';

const QuestionsSidebarItem = ({ index, questionItem, isActive, onClick }) => {
  const rootClassName = classNames(styles.questionItem, {
    [styles.questionItemActive]: isActive,
  });

  const onSidebarQuestionClick = React.useCallback(
    () => onClick(questionItem.id),
    [onClick, questionItem]
  );

  const handleActionsClick = React.useCallback(event => {
    event.stopPropagation();
    alert('wtf!');
  });

  return (
    <div className={rootClassName} onClick={onSidebarQuestionClick}>
      <div className={styles.questionItemIndex}>{index}</div>
      <div className={styles.questionItemTitle}>
        <div className={styles.questionItemTitleText}>{questionItem.title}</div>
        <div
          className={styles.questionItemTitleActions}
          onClick={handleActionsClick}
        >
          ...
        </div>
      </div>
    </div>
  );
};

const QuestionsSidebarItemMemoized = React.memo(QuestionsSidebarItem);

const QuestionsSidebar = ({ questions, currentQuestionId, onItemClick }) => {
  const renderedQuestionList = React.useMemo(
    () =>
      questions.map((question, index) => (
        <QuestionsSidebarItemMemoized
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

export default React.memo(QuestionsSidebar);
