import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getQuestionByIdSelector } from 'models/tests/questions/selectors';
import {
  getAnswersByIdsSelector,
  createdAnswerLoadingSelector,
  createdAnswerSuccessSelector,
} from 'models/tests/answers/selectors';
import useAction from 'hooks/useAction';
import { answersActions } from 'models/tests/answers/slice';
import { questionsActions } from 'models/tests/questions/slice';
import QuestionAnswerEdit from 'components/QuestionAnswerEdit';
import SelectQuizKind from 'components/SelectQuizKind/SelectQuizKind';

import styles from './QuizQuestion.scss';
import globalStyles from 'styles/global.scss';
import QuizInput from 'components/QuizInput/QuizInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';

const QuizQuestion = ({ id }) => {
  const question = useSelector(getQuestionByIdSelector, id);
  const answers = useSelector(getAnswersByIdsSelector, question.answers);

  const isAnswerCreated = useSelector(createdAnswerSuccessSelector);
  const onAnswerCreate = useAction(answersActions.createNewAnswer);
  const createdAnswerLoading = useSelector(createdAnswerLoadingSelector);
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

  const onAnswerChange = useAction(answersActions.changeAnswerData);
  const onAnswerDelete = useAction(answersActions.deleteAnswer);
  const onQuestionChange = useAction(questionsActions.changeQuestionData);

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
          onAnswerChange={onAnswerChange}
          onDelete={onAnswerDelete}
          onDrag={() => console.log('drag')}
        />
      )),
    [answers, onAnswerChange, onAnswerDelete, id]
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
          <button className={styles.btnSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

QuizQuestion.propTypes = {
  id: PropTypes.number.isRequired,
};

export default React.memo(QuizQuestion);
