import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import { answersActions } from 'models/tests/answers/slice';
import {
  isAnswerDeletingSelector,
  isAnswerChangedSelector,
} from 'models/tests/answers/selectors';

import QuestionAnswerEdit from './QuestionAnswerEdit';
import {
  isQuestionSingle,
  getCurrentQuestionAnswersSelector,
} from 'models/tests/questions/selectors';

const QuestionAnswerEditContainer = ({ index, answer, questionId }) => {
  const { id } = answer;

  const onAnswerChange = useAction(answersActions.changeAnswerData);
  const onRadioToggle = useAction(answersActions.setSingleAnswerActive);
  const onAnswerDelete = useAction(answersActions.deleteAnswer);
  const onAnswerUndoChanges = useAction(answersActions.undoAnswerChanges);

  const isAnswerChanged = useSelector(isAnswerChangedSelector, id);
  const isAnswerDeleting = useSelector(isAnswerDeletingSelector, id);
  const isSingleType = useSelector(isQuestionSingle, questionId);
  const questionsAnswers = useSelector(getCurrentQuestionAnswersSelector);

  const onInputChange = useCallback(
    event => {
      onAnswerChange({ id, text: event.target.value });
    },
    [id, onAnswerChange]
  );

  const onDelete = useCallback(() => {
    onAnswerDelete({ questionId, id });
  }, [onAnswerDelete, questionId, id]);

  const onUndo = useCallback(() => {
    onAnswerUndoChanges({ id });
  }, [onAnswerUndoChanges, id]);

  const toggleCheckbox = useCallback(
    () => onAnswerChange({ id, is_right: !answer.is_right }),
    [id, answer.is_right, onAnswerChange]
  );

  const toggleRadio = useCallback(
    () => onRadioToggle({ id, answers: questionsAnswers }),
    [id, questionsAnswers, onRadioToggle]
  );

  const onCheckboxToggle = isSingleType ? toggleRadio : toggleCheckbox;

  return (
    <QuestionAnswerEdit
      index={index}
      answer={answer}
      isSingle={isSingleType}
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
  index: PropTypes.number.isRequired,
  answer: PropTypes.object.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuestionAnswerEditContainer;
