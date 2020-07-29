import React, { useState, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import checkIcon from 'images/check-icon.svg';

import styles from './QuestionsSidebar.scss';
import QuestionsSidebarItem from '../QuestionsSidebarItem';
import QuizInput from 'components/QuizInput/QuizInput';
import useAction from 'hooks/useAction';
import { questionsActions } from 'models/tests/questions/slice';
import Dropdown from 'components/Dropdown/Dropdown';
import { QUIZ_KINDS } from 'pages/Quiz/constants';
import DropdownItem from 'components/Dropdown/DropdownItem';
import AnswerInput from 'components/AnswerInput/AnswerInput';

const quizKinds = Object.keys(QUIZ_KINDS);

const QuestionsSidebar = ({
  questions,
  currentQuestionId,
  currentQuizId,
  onItemClick,
}) => {
  const onQuestionCreate = useAction(questionsActions.createQuestion);
  const [newQuestionData, setNewQuestionData] = useState(null);
  const createNewQuestion = useCallback(
    kind => {
      setNewQuestionData({ title: '', kind });
    },
    [setNewQuestionData]
  );
  const onNewQuestionTitleChange = useCallback(
    event =>
      setNewQuestionData({ ...newQuestionData, title: event.target.value }),
    [newQuestionData, setNewQuestionData]
  );
  const onNewQuestionSubmit = useCallback(
    event => {
      event.preventDefault();
      onQuestionCreate({
        data: {
          title: newQuestionData.title,
          question_type: newQuestionData.kind,
        },
        quizId: currentQuizId,
      });
      setNewQuestionData(null);
    },
    [setNewQuestionData, onQuestionCreate, newQuestionData, currentQuizId]
  );

  const renderedQuestionList = useMemo(
    () =>
      questions.map((question, index) => (
        <QuestionsSidebarItem
          key={question.id}
          questionItem={question}
          isActive={currentQuestionId === question.id}
          onClick={onItemClick}
          index={index}
        />
      )),
    [questions, currentQuestionId, onItemClick]
  );

  const onDropdownKindSelect = React.useCallback(
    type => () => createNewQuestion(type),
    [createNewQuestion]
  );

  const renderedDropdownQuizKinds = React.useMemo(
    () =>
      quizKinds.map((quizKind, index) => (
        <DropdownItem key={index} onClick={onDropdownKindSelect(quizKind)}>
          {QUIZ_KINDS[quizKind].label}
        </DropdownItem>
      )),
    [quizKinds, onDropdownKindSelect, QUIZ_KINDS]
  );

  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {renderedQuestionList}

        {newQuestionData != null && (
          <form className={styles.inputGroup} onSubmit={onNewQuestionSubmit}>
            <div className={styles.inputGroupInner}>
              <AnswerInput
                value={newQuestionData.title}
                onChange={onNewQuestionTitleChange}
                placeholder="Enter new question"
              />
              <button className={styles.saveBtn} type="submit">
                <img src={checkIcon} width="22" alt="check" />
              </button>
            </div>
            <div className={styles.inputGroupCaption}>
              {newQuestionData.kind}
            </div>
          </form>
        )}
      </div>

      <div className={styles.floating}>
        <Dropdown
          togglerClassName={styles.floatingButton}
          togglerContent="+"
          offsetY={10}
        >
          {renderedDropdownQuizKinds}
        </Dropdown>
      </div>
    </div>
  );
};

QuestionsSidebar.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionId: PropTypes.number.isRequired,
  currentQuizId: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default memo(QuestionsSidebar);
