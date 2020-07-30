import React from 'react';
import { quizzesActions } from 'models/tests/quizzes/slice';
import useSelector from 'hooks/useSelector';
import { getQuizDataByIdSelector } from 'models/tests/quizzes/selectors';
import PropTypes from 'prop-types';
import useAction from 'hooks/useAction';
import EditQuiz from './EditQuiz';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

export const QuizModifyContext = React.createContext({
  quizId: null,
});

const EditQuizContainer = ({ id }) => {
  const onFetchQuiz = useAction(quizzesActions.fetchQuiz);
  const quiz = useSelector(getQuizDataByIdSelector, id);

  const loading = React.useMemo(
    () => !!Object.getOwnPropertyDescriptor(quiz, 'fetched') && !quiz.fetched,
    [quiz]
  );

  React.useEffect(() => {
    if (loading) {
      onFetchQuiz({ id });
    }
  }, [loading, onFetchQuiz, id]);

  return !loading ? (
    <QuizModifyContext.Provider value={{ quizId: id }}>
      <EditQuiz {...quiz} />
    </QuizModifyContext.Provider>
  ) : (
    'loading...'
  );
};

EditQuizContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(
  EditQuizContainer
);
