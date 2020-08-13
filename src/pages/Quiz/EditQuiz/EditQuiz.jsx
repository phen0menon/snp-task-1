import React from 'react';
import PropTypes from 'prop-types';

import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';

import {
  getQuestionsByIdsSelector,
  getCurrentQuestionIdSelector,
} from 'models/tests/questions/selectors';
import { questionsActions } from 'models/tests/questions/slice';

import QuestionsSidebar from 'components/QuestionsSidebar/QuestionsSidebar';
import QuizQuestion from '../components/QuizQuestion';

import styles from './EditQuiz.scss';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

const EditQuiz = ({ questions, title }) => {
  const questionId = useSelector(getCurrentQuestionIdSelector);
  const questionList = useSelector(getQuestionsByIdsSelector, questions);
  const onQuestionOpen = useAction(questionsActions.openQuestion);

  React.useEffect(() => {
    if (questions.length) {
      onQuestionOpen({ id: questions[0] });
    }
  });

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <QuestionsSidebar questions={questionList} title={title} />
      </div>

      <div className={styles.content}>
        {questionId != null && <QuizQuestion />}
      </div>
    </div>
  );
};

EditQuiz.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED, true)(
  EditQuiz
);
