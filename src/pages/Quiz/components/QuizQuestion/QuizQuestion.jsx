import React, { useMemo } from 'react';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import { questionsActions } from 'models/tests/questions/slice';
import { getCurrentQuestionEntity } from 'models/tests/questions/selectors';

import SelectQuizKind from 'components/SelectQuizKind/SelectQuizKind';

import globalStyles from 'styles/global.scss';
import styles from './QuizQuestion.scss';
import { QUIZ_NUMBER_KIND } from '../../constants';
import QuestionChoiceKind from '../QuestionChoiceKind/QuestionChoiceKind';
import QuestionNumericKind from '../QuestionNumericKind/QuestionNumericKind';

const QuizQuestion = () => {
  const question = useSelector(getCurrentQuestionEntity);
  const { id } = question;

  const onQuestionChange = useAction(questionsActions.changeQuestionData);

  const onQuestionTitleChange = React.useCallback(
    event => {
      onQuestionChange({ id, title: event.target.value });
    },
    [id, onQuestionChange]
  );

  const renderedQuestionData = useMemo(
    () =>
      question.question_type !== QUIZ_NUMBER_KIND ? (
        <QuestionChoiceKind {...question} />
      ) : (
        <QuestionNumericKind {...question} />
      ),
    [question]
  );

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <textarea
            value={question.title}
            className={globalStyles.formTextarea}
            onChange={onQuestionTitleChange}
          />
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
