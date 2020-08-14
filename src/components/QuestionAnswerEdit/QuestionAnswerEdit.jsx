import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import QuizInput from 'components/QuizInput/QuizInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';
import Radio from 'components/Radio/Radio';
import Checkbox from 'components/Checkbox';
import { Draggable } from 'react-beautiful-dnd';

import timesIcon from 'images/times-icon.svg';
import dragIcon from 'images/drag-icon.svg';
import trashIcon from 'images/trash-icon.svg';

import styles from './QuestionAnswerEdit.scss';

const getItemStyle = isDragging => ({
  userSelect: 'none',
  boxShadow: isDragging ? `rgba(0, 0, 0, 0.15) 0px 3px 7px 0px` : `none`,
  transform: isDragging ? `scale(1.04)` : 'none',
});

const QuestionAnswerEdit = ({
  index,
  answer,
  isSingle,
  isChanged,
  isDeleting,
  onInputChange,
  onCheckboxToggle,
  onDelete,
  onUndo,
}) => {
  const ActionInput = isSingle ? Radio : Checkbox;
  return (
    <Draggable key={answer.id} draggableId={answer.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div
            className={styles.answer}
            style={getItemStyle(snapshot.isDragging)}
          >
            <div className={styles.answerCheckbox}>
              <ActionInput
                name="isRight"
                id="isRight"
                value={answer.is_right}
                onChange={onCheckboxToggle}
              />
            </div>
            <div
              className={classNames(
                styles.answerContent,
                styles.answerContentGutter
              )}
            >
              <QuizInput
                className={styles.input}
                value={answer.text}
                placeholder="Answer text"
                onChange={onInputChange}
              />

              <div className={styles.actions}>
                {isChanged && (
                  <button
                    className={classNames(styles.action, styles.actionUndo)}
                    onClick={onUndo}
                  >
                    <img src={timesIcon} alt="Undo" width={16} />
                    <span>Undo</span>
                  </button>
                )}
                <button
                  className={styles.action}
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  <SpinnerLoader loading={isDeleting} size={18}>
                    <img src={trashIcon} alt="Delete" width={16} />
                  </SpinnerLoader>
                </button>
                <div className={styles.action} {...provided.dragHandleProps}>
                  <img src={dragIcon} alt="Drag" width="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

QuestionAnswerEdit.propTypes = {
  index: PropTypes.number.isRequired,
  answer: PropTypes.object.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isSingle: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
};

export default React.memo(QuestionAnswerEdit);
