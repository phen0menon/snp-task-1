import React from 'react';

import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import {
  getAnswersByIdsSelector,
  createdAnswerLoadingSelector,
  createdAnswerSuccessSelector,
} from 'models/tests/answers/selectors';
import { questionsActions } from 'models/tests/questions/slice';
import { answersActions } from 'models/tests/answers/slice';
import {
  isQuestionHasModificationsSelector,
  getCurrentQuestionEntity,
} from 'models/tests/questions/selectors';

import QuestionAnswerEdit from 'components/QuestionAnswerEdit';
import SelectQuizKind from 'components/SelectQuizKind/SelectQuizKind';
import QuizInput from 'components/QuizInput/QuizInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';

import globalStyles from 'styles/global.scss';
import styles from './QuizQuestion.scss';

const QuizQuestion = () => {
  const { id, ...question } = useSelector(getCurrentQuestionEntity);
  const answers = useSelector(getAnswersByIdsSelector, question.answers);
  const isAnswerCreated = useSelector(createdAnswerSuccessSelector);
  const createdAnswerLoading = useSelector(createdAnswerLoadingSelector);
  const questionHasModifications = useSelector(
    isQuestionHasModificationsSelector
  );

  const onAnswerCreate = useAction(answersActions.createNewAnswer);
  const onQuestionChange = useAction(questionsActions.changeQuestionData);
  const onQuestionSave = useAction(questionsActions.saveQuestionData);

  const [createdAnswerText, setCreatedAnswerText] = React.useState(null);
  const createdAnswerInputDisplayed = createdAnswerText != null;
  const createOrSubmitInput = React.useCallback(() => {
    if (!createdAnswerText) {
      setCreatedAnswerText('');
    } else if (!createdAnswerLoading) {
      onAnswerCreate({ questionId: id, text: createdAnswerText });
    }
  }, [
    id,
    createdAnswerText,
    setCreatedAnswerText,
    onAnswerCreate,
    createdAnswerLoading,
  ]);

  const onQuestionTitleChange = React.useCallback(
    event => {
      onQuestionChange({ id, title: event.target.value });
    },
    [id, onQuestionChange]
  );

  const renderedAnswers = React.useMemo(
    () =>
      answers.map(answer => (
        <QuestionAnswerEdit
          key={answer.id}
          questionId={id}
          answer={answer}
          onDrag={() => console.log('drag')}
        />
      )),
    [answers, id]
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

        <div className={styles.answers}>
          {renderedAnswers}
          {createdAnswerText != null && (
            <QuizInput
              text={createdAnswerText}
              setText={setCreatedAnswerText}
              onSubmit={createOrSubmitInput}
              created={isAnswerCreated}
              placeholder="Enter new answer"
            />
          )}
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
            <button className={styles.btnSave} onClick={onQuestionSave}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

QuizQuestion.propTypes = {};

export default React.memo(QuizQuestion);
