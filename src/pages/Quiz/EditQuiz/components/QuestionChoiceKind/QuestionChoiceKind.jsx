import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import {
  getAnswersByIdsSelector,
  createdAnswerLoadingSelector,
  createdAnswerSuccessSelector,
} from 'models/tests/answers/selectors';
import { questionsActions } from 'models/tests/questions/slice';
import { answersActions } from 'models/tests/answers/slice';
import { isQuestionHasModificationsSelector } from 'models/tests/questions/selectors';

import QuizAnswerInput from 'components/QuizAnswerInput/QuizAnswerInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import DraggableAnswerList from '../DraggableAnswerList/DraggableAnswerList';

import { ValidationStrings, QUIZ_SINGLE_KIND } from '../../../constants';
import styles from '../QuizQuestion/QuizQuestion.scss';

const QuestionChoiceKind = ({ parentError, formBusy, ...question }) => {
  const [error, setError] = useState(null);

  const answers = useSelector(getAnswersByIdsSelector, question.answers);
  const isAnswerCreated = useSelector(createdAnswerSuccessSelector);

  const createdAnswerLoading = useSelector(createdAnswerLoadingSelector);
  const questionHasModifications = useSelector(
    isQuestionHasModificationsSelector
  );

  const onAnswerCreate = useAction(answersActions.createNewAnswer);
  const onQuestionSave = useAction(questionsActions.saveQuestionData);

  const validateAnswerForm = useCallback(
    (rule, predicate) => {
      if (!predicate) {
        setError(rule);
        return false;
      } else if (error === rule) {
        setError(null);
      }
      return true;
    },
    [error, setError]
  );

  React.useEffect(() => {
    const { NOT_ENOUGH_ANSWERS, ONLY_ONE_RIGHT_ANSWER } = ValidationStrings;
    const rightAnswersAmount = answers.filter(a => a.is_right).length;

    if (
      question.question_type === QUIZ_SINGLE_KIND &&
      !validateAnswerForm(ONLY_ONE_RIGHT_ANSWER, rightAnswersAmount <= 1)
    )
      return;

    validateAnswerForm(NOT_ENOUGH_ANSWERS, answers.length >= 2);
  }, [question, answers, validateAnswerForm]);

  const saveQuestion = useCallback(() => {
    if (error || parentError) return;
    onQuestionSave({
      id: question.id,
      questionData: question,
    });
  }, [error, parentError, onQuestionSave, question]);

  const [createdAnswerText, setCreatedAnswerText] = useState(null);
  const createdAnswerInputDisplayed = createdAnswerText != null;
  const createOrSubmitInput = useCallback(() => {
    if (!createdAnswerText) {
      setCreatedAnswerText('');
    } else if (!createdAnswerLoading) {
      onAnswerCreate({ questionId: question.id, text: createdAnswerText });
    }
  }, [
    question.id,
    createdAnswerText,
    setCreatedAnswerText,
    onAnswerCreate,
    createdAnswerLoading,
  ]);

  return (
    <>
      <div className={styles.answers}>
        <div
          className={classNames(styles.answersContainer, {
            [styles.answersContainerDisabled]: formBusy,
          })}
        >
          <DraggableAnswerList answers={answers} questionId={question.id} />
        </div>
        {createdAnswerText != null && (
          <QuizAnswerInput
            text={createdAnswerText}
            setText={setCreatedAnswerText}
            onSubmit={createOrSubmitInput}
            created={isAnswerCreated}
            placeholder="Enter new answer"
          />
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.btnAddAnswer}
          onClick={createOrSubmitInput}
          disabled={createdAnswerLoading}
        >
          <SpinnerLoader loading={createdAnswerLoading} size={26}>
            {createdAnswerInputDisplayed ? 'Save answer' : 'Add answer'}
          </SpinnerLoader>
        </button>
        {questionHasModifications && (
          <button
            className={styles.btnSave}
            onClick={saveQuestion}
            disabled={formBusy || error}
          >
            <SpinnerLoader loading={formBusy} size={20}>
              Save
            </SpinnerLoader>
          </button>
        )}
      </div>
    </>
  );
};

QuestionChoiceKind.propTypes = {
  formBusy: PropTypes.bool.isRequired,
  parentError: PropTypes.string,
};

QuestionChoiceKind.defaultProps = {
  parentError: null,
};

export default QuestionChoiceKind;
