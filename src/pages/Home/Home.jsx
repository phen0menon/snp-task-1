import React from 'react';
import classNames from 'classnames';

import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import useAction from 'hooks/useAction';
import { quizzesActions } from 'models/tests/quizzes/slice';
import QuizList from './QuizList';
import Button from 'components/Button';

import styles from './Home.scss';
import globalStyles from 'styles/global.scss';

const Home = () => {
  const onFetchQuizzes = useAction(quizzesActions.fetchQuizzes);

  React.useEffect(() => {
    onFetchQuizzes();
  }, []);

  return (
    <div className={styles.root}>
      <div className={globalStyles.container}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.title}>Quizer</div>
            <div className={styles.actions}>
              <Button type="button" className={styles.actionsCreate}>
                + Quiz
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <QuizList />
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
