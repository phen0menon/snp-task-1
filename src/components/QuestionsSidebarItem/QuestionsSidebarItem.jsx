import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './QuestionsSidebarItem.scss';

const QuestionsSidebarItem = ({ index, questionItem, isActive, onClick }) => {
  const rootClassName = classNames(styles.root, {
    [styles.active]: isActive,
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
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.title}>
        <div className={styles.titleText}>{questionItem.title}</div>
        <div className={styles.titleActions} onClick={handleActionsClick}>
          ...
        </div>
      </div>
    </div>
  );
};

QuestionsSidebarItem.propTypes = {
  index: PropTypes.number.isRequired,
  questionItem: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(QuestionsSidebarItem);
