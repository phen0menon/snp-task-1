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
import QuestionAnswerEdit from 'components/QuestionAnswerEdit';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import styles from '../QuizQuestion/QuizQuestion.scss';
import { ValidationStrings, QUIZ_SINGLE_KIND } from '../../constants';

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
    const { NOT_ENOUGH_ANSWERS, ONLY_ONE_RIGHT_ANSWER } = ValidationStrings;
    const rightAnswersAmount = answers.filter(a => a.is_right).length;

    if (question.question_type === QUIZ_SINGLE_KIND) {
      if (rightAnswersAmount > 1) {
        setError(ONLY_ONE_RIGHT_ANSWER);
        return;
      } else if (error === ONLY_ONE_RIGHT_ANSWER) {
        setError(null);
      }
    }

    if (answers.length < 2) {
      setError(NOT_ENOUGH_ANSWERS);
    } else if (error === NOT_ENOUGH_ANSWERS) {
      setError(null);
    }
  }, [error, question, answers, setError]);

  const saveQuestion = useCallback(() => {
    if (error || parentError) return;
    onQuestionSave({
      id: question.id,
      questionData: question,
    });
  }, [setError, onQuestionSave, question, question.answers]);

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
