import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './QuestionsSidebarItem.scss';
import Dropdown from 'components/Dropdown/Dropdown';

const QuestionsSidebarItem = ({ index, questionItem, isActive, onClick }) => {
  const rootClassName = classNames(styles.root, {
    [styles.active]: isActive,
  });

  const onSidebarQuestionClick = useCallback(() => onClick(questionItem.id), [
    onClick,
    questionItem,
  ]);

  const [isOpen, setOpen] = useState(false);
  const toggleDropdown = useCallback(
    event => {
      event.stopPropagation();
      setOpen(true);
    },
    [isOpen, setOpen]
  );
  const openDropdown = useCallback(() => setOpen(true), [setOpen]);
  const closeDropdown = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className={rootClassName} onClick={onSidebarQuestionClick}>
      <div className={styles.index}>{index + 1}</div>
      <div className={styles.title}>
        <div className={styles.titleInner}>
          <div className={styles.titleText}>{questionItem.title}</div>
        </div>
        <Dropdown isOpen={isOpen} open={openDropdown} close={closeDropdown}>
          <button className={styles.titleActions} onClick={toggleDropdown}>
            ...
          </button>

          <Dropdown.Items>
            <Dropdown.Item
              onClick={() => {
                console.log(questionItem);
              }}
            >
              Delete
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                console.log(questionItem);
              }}
            >
              Delete Qweq
            </Dropdown.Item>
          </Dropdown.Items>
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
