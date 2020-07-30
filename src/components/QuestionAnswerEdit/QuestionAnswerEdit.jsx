import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'components/Checkbox';

import timesIcon from 'images/times-icon.svg';
import dragIcon from 'images/drag-icon.svg';
import trashIcon from 'images/trash-icon.svg';

import styles from './QuestionAnswerEdit.scss';
import AnswerInput from 'components/AnswerInput/AnswerInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';

const QuestionAnswerEdit = ({
  answer,
  isChanged,
  isDeleting,
  onInputChange,
  onCheckboxToggle,
  onDelete,
  onUndo,
}) => {
  return (
    <div className={styles.answer}>
      <div className={styles.answerCheckbox}>
        <Checkbox
          name="isRight"
          id="isRight"
          value={answer.is_right}
          onChange={onCheckboxToggle}
        />
      </div>
      <div
        className={classNames(styles.answerContent, styles.answerContentGutter)}
      >
        <AnswerInput
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
          <button className={styles.action}>
            <img src={dragIcon} alt="Drag" width="20" />
          </button>
        </div>
      </div>
    </div>
  );
};

QuestionAnswerEdit.propTypes = {
  answer: PropTypes.object.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
};

export default React.memo(QuestionAnswerEdit);
