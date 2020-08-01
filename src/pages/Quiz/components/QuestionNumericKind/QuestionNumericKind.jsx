import React, { useCallback, useMemo } from 'react';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import { questionsActions } from 'models/tests/questions/slice';
import { isQuestionHasModificationsSelector } from 'models/tests/questions/selectors';

import AnswerInput from 'components/AnswerInput/AnswerInput';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';

import styles from '../QuizQuestion/QuizQuestion.scss';

const QuestionNumericKind = ({ parentError, formBusy, ...question }) => {
  const questionHasModifications = useSelector(
    isQuestionHasModificationsSelector
  );

  const [error, setError] = React.useState(null);

  const onQuestionChange = useAction(questionsActions.changeQuestionData);
  const onQuestionSave = useAction(questionsActions.saveQuestionData);

  const onChange = useCallback(
    e => {
      if (error) setError(null);
      onQuestionChange({ id: question.id, answer: e.target.value });
    },
    [setError, error, onQuestionChange, question.id]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (error || parentError) return;

      if (question.answer == null || !question.answer.toString().length) {
        return setError('Answer should not be empty');
      }

      onQuestionSave({ id: question.id, questionData: question });
    },
    [setError, onQuestionSave, question, parentError, error]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.answers}>
        <AnswerInput
          value={question.answer}
          type="number"
          onChange={onChange}
          placeholder="Enter numeric answer value"
          disabled={formBusy}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <div className={styles.actions}>
        {questionHasModifications && (
          <button className={styles.btnSave} type="submit" disabled={formBusy}>
            <SpinnerLoader loading={formBusy} size={20}>
              Save
            </SpinnerLoader>
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionNumericKind;
