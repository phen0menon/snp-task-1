import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useSelector from 'hooks/useSelector';
import { getQuestionByIdSelector } from 'models/questions/selectors';
import { getAnswersByIdsSelector } from 'models/answers/selectors';

import styles from './QuizQuestion.scss';
import globalStyles from 'styles/global.scss';
import Checkbox from 'components/Checkbox/Checkbox';
import useAction from 'hooks/useAction';
import { answersActions } from 'models/answers/slice';
import { questionsActions } from 'models/questions/slice';

export const QUIZ_TYPES = {
  single: {
    label: 'Single select',
  },
  multiple: {
    label: 'Multiple select',
  },
  number: {
    label: 'Numeric',
  },
};

const QuizAnswer = ({ answer, onAnswerChange, onDelete, onDrag, onEdit }) => {
  const { id } = answer;
  const onInputChange = React.useCallback(
    event => {
      onAnswerChange({ id: answer.id, text: event.target.value });
    },
    [id, onAnswerChange]
  );

  return (
    <div className={styles.answer}>
      <div className={styles.answerCheckbox}>
        <Checkbox />
      </div>
      <div className={styles.answerContent}>
        <input
          type="text"
          className={classNames([
            globalStyles.formTextarea,
            globalStyles.formTextareaSmall,
          ])}
          value={answer.text}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

const QuizAnswerMemoized = React.memo(QuizAnswer);

const QuizQuestion = ({ id }) => {
  const question = useSelector(getQuestionByIdSelector, id);
  const answers = useSelector(getAnswersByIdsSelector, question.answers);

  const onAnswerChange = useAction(answersActions.changeAnswerData);
  const onQuestionChange = useAction(questionsActions.changeQuestionData);

  const onQuestionTitleChange = React.useCallback(
    event => {
      onQuestionChange({ id, title: event.target.value });
    },
    [id]
  );

  const renderedAnswers = React.useMemo(
    () =>
      answers.map((answer, index) => (
        <QuizAnswerMemoized
          key={answer.id}
          answer={answer}
          onAnswerChange={onAnswerChange}
          onDelete={() => alert('delete')}
          onDrag={() => alert('drag')}
          onEdit={() => alert('edit')}
        />
      )),
    [answers]
  );

  const renderedQuizTypes = React.useMemo(
    () =>
      Object.keys(QUIZ_TYPES).map((quizType, index) => (
        <div
          key={quizType}
          className={classNames(styles.type, {
            [styles.typeActive]: quizType === question.question_type,
          })}
          onClick={() => alert('k')}
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
        <div className={styles.answers}>{renderedAnswers}</div>
        <div className={styles.actions}>
          <button className={styles.btnAddAnswer}>Add answer</button>
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
