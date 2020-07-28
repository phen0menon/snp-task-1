import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'components/Checkbox';

import timesIcon from 'assets/images/times-icon.svg';
import dragIcon from 'assets/images/drag-icon.svg';

import styles from './QuestionAnswerEdit.scss';
import AnswerInput from 'components/AnswerInput/AnswerInput';
import useSelector from 'hooks/useSelector';
import spinnerAnimated from 'assets/images/spinner-animated.svg';
import { isAnswerDeletingSelector } from 'models/tests/answers/selectors';

const QuestionAnswerEdit = ({
  answer,
  onAnswerChange,
  onDelete,
  onDrag,
  questionId,
}) => {
  const { id } = answer;

  const isAnswerDeleting = useSelector(isAnswerDeletingSelector, id);

  const onInputChange = React.useCallback(
    event => {
      onAnswerChange({ id, text: event.target.value });
    },
    [id, onAnswerChange]
  );

  const onAnswerDelete = React.useCallback(() => {
    if (onDelete && questionId) {
      onDelete({ questionId, id });
    }
  }, [onDelete, questionId, id]);

  const toggleCheckbox = React.useCallback(
    event => {
      onAnswerChange({ id, is_right: event.target.checked });
    },
    [id, onAnswerChange]
  );

  return (
    <div className={styles.answer}>
      <div className={styles.answerCheckbox}>
        <Checkbox
          name="isRight"
          id="isRight"
          value={answer.is_right}
          onChange={toggleCheckbox}
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
          <button
            className={styles.action}
            onClick={onAnswerDelete}
            disabled={isAnswerDeleting}
          >
            <img
              src={isAnswerDeleting ? spinnerAnimated : timesIcon}
              alt="Delete"
              width={isAnswerDeleting ? 18 : 16}
            />
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
  onAnswerChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onDrag: PropTypes.func,
  questionId: PropTypes.number,
};

QuestionAnswerEdit.defaultProps = {
  onDrag: null,
  onDelete: null,
  questionId: null,
};

export default React.memo(QuestionAnswerEdit);
