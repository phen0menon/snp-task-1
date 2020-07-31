import React, { useCallback, useMemo } from 'react';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import { questionsActions } from 'models/tests/questions/slice';
import {
  isQuestionHasModificationsSelector,
  getCurrentQuestionSavingStatusSelector,
} from 'models/tests/questions/selectors';

import AnswerInput from 'components/AnswerInput/AnswerInput';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import styles from '../QuizQuestion/QuizQuestion.scss';

const QuestionNumericKind = ({ id, answer, title, question_type }) => {
  const questionHasModifications = useSelector(
    isQuestionHasModificationsSelector
  );
  const questionSavingStatus = useSelector(
    getCurrentQuestionSavingStatusSelector
  );

  const questionFormBusy = useMemo(() => questionSavingStatus === 'pending', [
    questionSavingStatus,
  ]);

  const [error, setError] = React.useState(null);

  const onQuestionChange = useAction(questionsActions.changeQuestionData);
  const onQuestionSave = useAction(questionsActions.saveQuestionData);

  const onChange = useCallback(
    e => {
      if (error) setError(null);
      onQuestionChange({ id, answer: e.target.value });
    },
    [setError, error, onQuestionChange, id]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (error) return;

      if (answer == null || !answer.toString().length) {
        return setError('Answer should not be empty');
      }

      onQuestionSave({ id, questionData: { title, answer, question_type } });
    },
    [answer, setError, onQuestionSave, title, question_type]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.answers}>
        <AnswerInput
          value={answer}
          type="number"
          onChange={onChange}
          placeholder="Enter numeric answer value"
          disabled={questionFormBusy}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <div className={styles.actions}>
        {questionHasModifications && (
          <button
            className={styles.btnSave}
            type="submit"
            disabled={questionFormBusy}
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionNumericKind;
