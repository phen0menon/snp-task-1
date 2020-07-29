import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './QuestionsSidebarItem.scss';
import Dropdown from 'components/Dropdown/Dropdown';
import DropdownItem from 'components/Dropdown/DropdownItem';

const QuestionsSidebarItem = ({ index, questionItem, isActive, onClick }) => {
  const rootClassName = classNames(styles.root, {
    [styles.active]: isActive,
  });

  const onSidebarQuestionClick = useCallback(() => onClick(questionItem.id), [
    onClick,
    questionItem,
  ]);

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
          <DropdownItem
            onClick={() => {
              console.log(questionItem);
            }}
          >
            Delete
          </DropdownItem>
        </Dropdown>
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
