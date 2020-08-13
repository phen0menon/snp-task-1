import React, { useCallback } from 'react';

import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import useAction from 'hooks/useAction';
import useModal from 'hooks/useModal';
import { quizzesActions } from 'models/tests/quizzes/slice';
import QuizList from './QuizList';
import Button from 'components/Button';

import styles from './Home.scss';
import globalStyles from 'styles/global.scss';
import CreateQuizModal from '../../components/CreateQuizModal/CreateQuizModal';
import { sessionActions } from '../../models/session/slice';

const Home = () => {
  const onFetchQuizzes = useAction(quizzesActions.fetchQuizzes);
  const onFetchLogout = useAction(sessionActions.fetchLogout);
  const modalSettings = useModal();

  const onLogoutClick = useCallback(() => onFetchLogout(), [onFetchLogout]);

  React.useEffect(() => {
    onFetchQuizzes();
  }, [onFetchQuizzes]);

  return (
    <div className={styles.root}>
      <div className={globalStyles.container}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.title}>Quizer</div>
            <div className={styles.actions}>
              <Button
                type="button"
                className={styles.actionsCreate}
                onClick={modalSettings.open}
              >
                + Quiz
              </Button>
              <Button type="button" onClick={onLogoutClick}>
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <QuizList />
        </div>
      </div>

      <CreateQuizModal {...modalSettings} />
    </div>
  );
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
