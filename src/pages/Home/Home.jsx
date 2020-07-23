import React from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import useAction from 'hooks/useAction';
import { quizzesActions } from 'models/quizzes/slice';
import QuizList from './QuizList';

const Home = () => {
  const onFetchQuizzes = useAction(quizzesActions.fetchQuizzes);

  React.useEffect(() => {
    onFetchQuizzes();
  }, []);

  return (
    <div>
      Quizer
      <QuizList />
    </div>
  );
};

export default withAuthentication(AuthenticationStatus.ANY)(Home);
