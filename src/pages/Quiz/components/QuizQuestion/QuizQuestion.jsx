import React, { useMemo, useState } from 'react';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import { QUIZ_NUMBER_KIND, ValidationStrings } from '../../constants';

import { questionsActions } from 'models/tests/questions/slice';
import { getCurrentQuestionEntity } from 'models/tests/questions/selectors';

import SelectQuizKind from 'components/SelectQuizKind/SelectQuizKind';
import QuestionNumericKind from '../QuestionNumericKind/QuestionNumericKind';
import QuestionChoiceKind from '../QuestionChoiceKind/QuestionChoiceKind';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import globalStyles from 'styles/global.scss';
import styles from './QuizQuestion.scss';
import { getCurrentQuestionSavingStatusSelector } from '../../../../models/tests/questions/selectors';

const QuizQuestion = () => {
  const question = useSelector(getCurrentQuestionEntity);
  const { id } = question;

  const questionSavingStatus = useSelector(
    getCurrentQuestionSavingStatusSelector
  );

  const questionFormBusy = useMemo(() => questionSavingStatus === 'pending', [
    questionSavingStatus,
  ]);

  const onQuestionChange = useAction(questionsActions.changeQuestionData);

  const [error, setError] = useState(null);

  const onQuestionTitleChange = React.useCallback(
    event => {
      const title = event.target.value.trimStart();
      onQuestionChange({ id, title });

      if (!title.length) {
        setError(ValidationStrings.QUESTION_TITLE_EMPTY);
      } else if (error) {
        setError(null);
      }
    },
    [id, onQuestionChange, setError, error]
  );

  const renderedQuestionData = useMemo(() => {
    const injectedProps = {
      parentError: error,
      formBusy: questionFormBusy,
      ...question,
    };
    return question.question_type !== QUIZ_NUMBER_KIND ? (
      <QuestionChoiceKind {...injectedProps} />
    ) : (
      <QuestionNumericKind {...injectedProps} />
    );
  }, [question, error, questionFormBusy]);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <textarea
            value={question.title}
            className={globalStyles.formTextarea}
            onChange={onQuestionTitleChange}
            disabled={questionFormBusy}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>

        <SelectQuizKind
          activeKind={question.question_type}
          onChange={() => console.log('changed')}
          style={{ margin: '1rem 0' }}
        />

        {renderedQuestionData}
      </div>
    </div>
  );
};

QuizQuestion.propTypes = {};

export default React.memo(QuizQuestion);
