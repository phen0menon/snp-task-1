import React from 'react';
import PropTypes from 'prop-types';

import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import { answersActions } from 'models/tests/answers/slice';
import {
  isAnswerDeletingSelector,
  isAnswerChangedSelector,
} from 'models/tests/answers/selectors';

import QuestionAnswerEdit from './QuestionAnswerEdit';

const QuestionAnswerEditContainer = ({ answer, questionId }) => {
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
    <QuestionAnswerEdit
      answer={answer}
      isChanged={isAnswerChanged}
      isDeleting={isAnswerDeleting}
      onCheckboxToggle={onCheckboxToggle}
      onInputChange={onInputChange}
      onDelete={onDelete}
      onUndo={onUndo}
    />
  );
};

QuestionAnswerEditContainer.propTypes = {
  answer: PropTypes.object.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuestionAnswerEditContainer;
