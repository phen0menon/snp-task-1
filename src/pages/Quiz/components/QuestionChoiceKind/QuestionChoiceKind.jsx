import React, { useState, useCallback } from 'react';

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

import styles from '../QuizQuestion/QuizQuestion.scss';

const QuestionChoiceKind = ({ id, answers: answersIds, ...restProps }) => {
  const answers = useSelector(getAnswersByIdsSelector, answersIds);
  const isAnswerCreated = useSelector(createdAnswerSuccessSelector);

  const createdAnswerLoading = useSelector(createdAnswerLoadingSelector);
  const questionHasModifications = useSelector(
    isQuestionHasModificationsSelector
  );

  const onAnswerCreate = useAction(answersActions.createNewAnswer);
  const onQuestionSave = useAction(questionsActions.saveQuestionData);

  const [createdAnswerText, setCreatedAnswerText] = useState(null);
  const createdAnswerInputDisplayed = createdAnswerText != null;
  const createOrSubmitInput = useCallback(() => {
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
    <>
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
    </>
  );
};

export default QuestionChoiceKind;
