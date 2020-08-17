import React from 'react';
import PropTypes from 'prop-types';

import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';
import useVariable from 'hooks/useVariable';

import {
  getQuestionsByIdsSelector,
  getCurrentQuestionIdSelector,
} from 'models/tests/questions/selectors';
import { questionsActions } from 'models/tests/questions/slice';

import QuestionsSidebar from 'components/QuestionsSidebar/QuestionsSidebar';
import QuizQuestion from './components/QuizQuestion';

import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

import styles from './EditQuiz.scss';

export const QuizModifyContext = React.createContext({
  quizId: null,
});

const EditQuiz = ({ id, questions, title }) => {
  const questionId = useSelector(getCurrentQuestionIdSelector);
  const questionList = useSelector(getQuestionsByIdsSelector, questions);
  const onQuestionOpen = useAction(questionsActions.openQuestion);

  const [redirectedAfterRender, setRedirectedAfterRender] = useVariable(false);

  React.useEffect(() => {
    if (questions.length && !redirectedAfterRender) {
      onQuestionOpen({ id: questions[0] });
      setRedirectedAfterRender(true);
    }
  }, [
    redirectedAfterRender,
    questions,
    onQuestionOpen,
    setRedirectedAfterRender,
  ]);

  return (
    <QuizModifyContext.Provider value={{ quizId: id }}>
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <QuestionsSidebar questions={questionList} title={title} />
        </div>

        <div className={styles.content}>
          {questionId != null && <QuizQuestion />}
        </div>
      </div>
    </QuizModifyContext.Provider>
  );
};

EditQuiz.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED, true)(
  EditQuiz
);
