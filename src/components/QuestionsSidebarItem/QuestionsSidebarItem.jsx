import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import Dropdown from 'components/Dropdown/Dropdown';
import DropdownItem from 'components/Dropdown/DropdownItem';

import { questionsActions } from 'models/tests/questions/slice';
import { isQuestionDeletingSelector } from 'models/tests/questions/selectors';
import { QuizModifyContext } from 'pages/Quiz/EditQuiz/EditQuiz';

import styles from './QuestionsSidebarItem.scss';

const QuestionsSidebarItem = ({ index, questionItem, isActive }) => {
  const { quizId } = React.useContext(QuizModifyContext);
  const isQuestionDeleting = useSelector(
    isQuestionDeletingSelector,
    questionItem.id
  );

  const onQuestionDelete = useAction(questionsActions.deleteQuestion);
  const onQuestionOpen = useAction(questionsActions.openQuestion);

  const onSidebarQuestionClick = useCallback(
    () => onQuestionOpen({ id: questionItem.id }),
    [onQuestionOpen, questionItem]
  );

  const handleDeletionClick = useCallback(
    () => onQuestionDelete({ quizId, questionId: questionItem.id }),
    [quizId, questionItem, onQuestionDelete]
  );

  return (
    <div
      className={classNames(styles.root, {
        [styles.active]: isActive,
        [styles.deleting]: isQuestionDeleting,
      })}
      onClick={onSidebarQuestionClick}
    >
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
};

export default React.memo(QuestionsSidebarItem);
