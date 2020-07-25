import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useSelector from 'hooks/useSelector';
import { getQuestionByIdSelector } from 'models/questions/selectors';
import {
  getAnswersByIdsSelector,
  createdAnswerLoadingSelector,
  createdAnswerSuccessSelector,
} from 'models/answers/selectors';

import styles from './QuizQuestion.scss';
import globalStyles from 'styles/global.scss';
import useAction from 'hooks/useAction';
import { answersActions } from 'models/answers/slice';
import { questionsActions } from 'models/questions/slice';
import { QUIZ_TYPES } from '../constants';
import QuestionAnswerEdit from 'components/QuestionAnswerEdit';

const QuizQuestion = ({ id }) => {
  const question = useSelector(getQuestionByIdSelector, id);
  const answers = useSelector(getAnswersByIdsSelector, question.answers);

  const createdAnswerLoading = useSelector(createdAnswerLoadingSelector);
  const createdAnswerSuccess = useSelector(createdAnswerSuccessSelector);

  const onAnswerChange = useAction(answersActions.changeAnswerData);
  const onAnswerCreate = useAction(answersActions.createNewAnswer);
  const onQuestionChange = useAction(questionsActions.changeQuestionData);

  const [newAnswerData, setNewAnswerData] = React.useState(null);
  const createNewAnswerInput = React.useCallback(() => {
    if (!newAnswerData || !newAnswerData.text) {
      setNewAnswerData({ text: '', id: Date.now() });
    } else if (!createdAnswerLoading) {
      onAnswerCreate({ questionId: id, text: newAnswerData.text });
    }
  }, [
    id,
    newAnswerData,
    setNewAnswerData,
    onAnswerCreate,
    createdAnswerLoading,
  ]);
  const onNewAnswerChange = React.useCallback(
    data => {
      setNewAnswerData({ ...newAnswerData, ...data });
    },
    [newAnswerData, setNewAnswerData]
  );
  const creatingNewAnswer = newAnswerData != null;
  const onNewAnswerEnterInput = React.useCallback(
    evt => {
      const isEnter = evt.keyCode === 13 || evt.which === 13;
      if (isEnter && !!newAnswerData.text) {
        createNewAnswerInput();
      }
    },
    [createNewAnswerInput, newAnswerData]
  );
  React.useEffect(() => {
    setNewAnswerData({ text: '', id: Date.now() });
  }, [createdAnswerSuccess]);

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
          answer={answer}
          onAnswerChange={onAnswerChange}
          onDelete={() => {
            console.log('delete');
          }}
          onDrag={() => console.log('drag')}
        />
      )),
    [answers, onAnswerChange]
  );

  const renderedQuizTypes = React.useMemo(
    () =>
      Object.keys(QUIZ_TYPES).map(quizType => (
        <div
          key={quizType}
          className={classNames(styles.type, {
            [styles.typeActive]: quizType === question.question_type,
          })}
          onClick={() => {
            console.log('change quiz type');
          }}
        >
          {QUIZ_TYPES[quizType].label}
        </div>
      )),
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
        <div className={styles.types}>{renderedQuizTypes}</div>
        <div className={styles.answers}>
          {renderedAnswers}
          {creatingNewAnswer && (
            <QuestionAnswerEdit
              answer={newAnswerData}
              onAnswerChange={setNewAnswerData}
              onKeyDown={onNewAnswerEnterInput}
              temprary={true}
            />
          )}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.btnAddAnswer}
            onClick={createNewAnswerInput}
            disabled={createdAnswerLoading}
          >
            {creatingNewAnswer ? 'Save' : 'Add'} answer
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
