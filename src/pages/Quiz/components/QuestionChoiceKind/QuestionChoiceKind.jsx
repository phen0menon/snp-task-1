import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

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

import QuizInput from 'components/QuizInput/QuizInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';
import QuestionAnswerEdit from 'components/QuestionAnswerEdit';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import styles from '../QuizQuestion/QuizQuestion.scss';
import { ValidationStrings } from '../../constants';

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

  React.useEffect(() => {
    const { NOT_ENOUGH_ANSWERS } = ValidationStrings;
    if (question.answers.length < 2) {
      setError(NOT_ENOUGH_ANSWERS);
    } else if (error === NOT_ENOUGH_ANSWERS) {
      setError(null);
    }
  }, [error, question.answers, setError]);

  const saveQuestion = useCallback(() => {
    if (error || parentError) return;
    onQuestionSave({
      id: question.id,
      questionData: question,
    });
  }, [setError, onQuestionSave, question]);

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

  const renderedAnswers = React.useMemo(
    () =>
      answers.map(answer => (
        <QuestionAnswerEdit
          key={answer.id}
          questionId={question.id}
          answer={answer}
          onDrag={() => console.log('drag')}
          disabled={formBusy}
        />
      )),
    [answers, question.id]
  );

  return (
    <>
      <div className={styles.answers}>
        <div
          className={classNames(styles.answersContainer, {
            [styles.answersContainerDisabled]: formBusy,
          })}
        >
          {renderedAnswers}
        </div>
        {createdAnswerText != null && (
          <QuizInput
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
            disabled={formBusy}
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

export default QuestionChoiceKind;
