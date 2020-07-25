import React from 'react';
import { quizzesActions } from 'models/quizzes/slice';
import useSelector from 'hooks/useSelector';
import { getQuizDataByIdSelector } from 'models/quizzes/selectors';
import PropTypes from 'prop-types';
import useAction from 'hooks/useAction';
import EditQuiz from './EditQuiz';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

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

  return loading ? 'loading...' : <EditQuiz {...quiz} />;
};

EditQuizContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(
  EditQuizContainer
);