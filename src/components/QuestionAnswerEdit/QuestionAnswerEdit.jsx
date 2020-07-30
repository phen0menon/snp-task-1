import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'components/Checkbox';

import timesIcon from 'images/times-icon.svg';
import dragIcon from 'images/drag-icon.svg';
import trashIcon from 'images/trash-icon.svg';

import styles from './QuestionAnswerEdit.scss';
import AnswerInput from 'components/AnswerInput/AnswerInput';
import useSelector from 'hooks/useSelector';
import { answersActions } from 'models/tests/answers/slice';
import {
  isAnswerDeletingSelector,
  isAnswerChangedSelector,
} from 'models/tests/answers/selectors';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';
import useAction from '../../hooks/useAction';

const QuestionAnswerEdit = ({ answer, onDrag, questionId }) => {
  const { id } = answer;

  const onAnswerChange = useAction(answersActions.changeAnswerData);
  const onAnswerDelete = useAction(answersActions.deleteAnswer);
  const onAnswerUndoChanges = useAction(answersActions.undoAnswerChanges);

  const isAnswerChanged = useSelector(isAnswerChangedSelector, id);
  const isAnswerDeleting = useSelector(isAnswerDeletingSelector, id);

  const onInputChange = React.useCallback(
    event => {
      onAnswerChange({ id, text: event.target.value });
    },
    [id, onAnswerChange]
  );

  const onDelete = React.useCallback(() => {
    onAnswerDelete({ questionId, id });
  }, [onAnswerDelete, questionId, id]);

  const onUndo = React.useCallback(() => {
    onAnswerUndoChanges({ id });
  }, [onAnswerUndoChanges, id]);

  const onCheckboxToggle = React.useCallback(
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
          {isAnswerChanged && (
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
            disabled={isAnswerDeleting}
          >
            <SpinnerLoader loading={isAnswerDeleting} size={18}>
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
  onDrag: PropTypes.func,
  questionId: PropTypes.number,
};

QuestionAnswerEdit.defaultProps = {
  onDrag: null,
  onDelete: null,
  questionId: null,
};

export default React.memo(QuestionAnswerEdit);
