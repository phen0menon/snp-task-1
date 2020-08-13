import React, { useState, useMemo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import Dropdown from 'components/Dropdown/Dropdown';
import DropdownItem from 'components/Dropdown/DropdownItem';
import QuizInput from 'components/QuizInput/QuizInput';
import SpinnerLoader from 'components/SpinnerLoader/SpinnerLoader';
import QuestionsSidebarItem from '../QuestionsSidebarItem';
import { QUIZ_KINDS } from 'pages/Quiz/constants';
import { QuizModifyContext } from 'pages/Quiz/EditQuiz/EditQuizContainer';

import {
  questionCreatingPendingSelector,
  questionCreatingSuccessSelector,
  getCurrentQuestionIdSelector,
} from 'models/tests/questions/selectors';
import { questionsActions } from 'models/tests/questions/slice';

import checkIcon from 'images/check-icon.svg';
import returnIcon from 'images/return-icon.svg';
import styles from './QuestionsSidebar.scss';
import { Link } from 'react-router-dom';

const quizKinds = Object.keys(QUIZ_KINDS);

const QuestionsSidebar = ({ questions, title }) => {
  const { quizId } = useContext(QuizModifyContext);

  const currentQuestionId = useSelector(getCurrentQuestionIdSelector);
  const isQuestionCreating = useSelector(questionCreatingPendingSelector);
  const isQuestionCreated = useSelector(questionCreatingSuccessSelector);

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
        quizId,
      });
    },
    [onQuestionCreate, newQuestionData, quizId]
  );

  React.useEffect(() => {
    if (isQuestionCreated) {
      setNewQuestionData(null);
    }
  }, [isQuestionCreated, setNewQuestionData]);

  const renderedQuestionList = useMemo(
    () =>
      questions.map((question, index) => (
        <QuestionsSidebarItem
          key={question.id}
          questionItem={question}
          isActive={currentQuestionId === question.id}
          index={index}
        />
      )),
    [questions, currentQuestionId]
  );

  const onDropdownKindSelect = React.useCallback(
    type => () => createNewQuestion(type),
    [createNewQuestion]
  );

  const renderedDropdownQuizKinds = React.useMemo(
    () =>
      quizKinds.map(kind => (
        <DropdownItem key={kind} onClick={onDropdownKindSelect(kind)}>
          {QUIZ_KINDS[kind].label}
        </DropdownItem>
      )),
    [onDropdownKindSelect]
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Link className={styles.goBackButton} to="/">
          <img src={returnIcon} width={14} alt="return" />
          <span>to tests</span>
        </Link>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.items}>
        {renderedQuestionList}

        {newQuestionData != null && (
          <form className={styles.inputGroup} onSubmit={onNewQuestionSubmit}>
            <div className={styles.inputGroupInner}>
              <QuizInput
                value={newQuestionData.title}
                onChange={onNewQuestionTitleChange}
                placeholder="Enter new question"
                disabled={isQuestionCreating}
              />
              <button className={styles.saveBtn} type="submit">
                <SpinnerLoader loading={isQuestionCreating} size={22}>
                  <img src={checkIcon} width="22" alt="check" />
                </SpinnerLoader>
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
  title: PropTypes.string.isRequired,
};

export default QuestionsSidebar;
