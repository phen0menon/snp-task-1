import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './QuestionsSidebarItem.scss';
import Dropdown from 'components/Dropdown/Dropdown';
import DropdownItem from 'components/Dropdown/DropdownItem';
import useAction from 'hooks/useAction';
import { questionsActions } from 'models/tests/questions/slice';
import useSelector from 'hooks/useSelector';
import { isQuestionDeletingSelector } from 'models/tests/questions/selectors';

const QuestionsSidebarItem = ({
  index,
  questionItem,
  quizId,
  isActive,
  onClick,
}) => {
  const isQuestionDeleting = useSelector(
    isQuestionDeletingSelector,
    questionItem.id
  );
  const onQuestionDelete = useAction(questionsActions.deleteQuestion);

  const rootClassName = classNames(styles.root, {
    [styles.active]: isActive,
    [styles.deleting]: isQuestionDeleting,
  });

  const onSidebarQuestionClick = useCallback(() => onClick(questionItem.id), [
    onClick,
    questionItem,
  ]);

  // TODO: pass quizId through a context
  const handleDeletionClick = useCallback(
    () => onQuestionDelete({ quizId, questionId: questionItem.id }),
    [quizId, questionItem, onQuestionDelete]
  );

  return (
    <div className={rootClassName} onClick={onSidebarQuestionClick}>
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.title}>
        <div className={styles.titleInner}>
          <div className={styles.titleText}>{questionItem.title}</div>
        </div>

        <Dropdown
          togglerClassName={styles.titleActions}
          togglerContent="..."
          offsetY={10}
          placement="bottom"
        >
          <DropdownItem onClick={handleDeletionClick}>Delete</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

QuestionsSidebarItem.propTypes = {
  index: PropTypes.number.isRequired,
  questionItem: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  quizId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(QuestionsSidebarItem);
