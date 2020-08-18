import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';
import { getQuizDataByIdSelector } from 'models/tests/quizzes/selectors';
import { quizzesActions } from 'models/tests/quizzes/slice';
import InitialLoader from 'components/InitialLoader/InitialLoader';

const QuizContainer = ({ id, component: Component }) => {
  const onFetchQuiz = useAction(quizzesActions.fetchQuiz);
  const quiz = useSelector(getQuizDataByIdSelector, id);

  const loading = useMemo(
    () => !!Object.getOwnPropertyDescriptor(quiz, 'fetched') && !quiz.fetched,
    [quiz]
  );

  useEffect(() => {
    if (loading) {
      onFetchQuiz({ id });
    }
  }, [loading, onFetchQuiz, id]);

  return !loading ? <Component {...quiz} /> : <InitialLoader />;
};

QuizContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  component: PropTypes.func,
};

QuizContainer.defaultProps = {
  component: undefined,
};

export default QuizContainer;
