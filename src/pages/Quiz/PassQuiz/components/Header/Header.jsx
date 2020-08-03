import React, { useContext, useMemo } from 'react';
import { PassQuizContext } from '../../PassQuiz';
import { formatDate } from 'utils/common';
import styles from './Header.scss';

const Header = () => {
  const { quiz } = useContext(PassQuizContext);

  const creationDate = useMemo(() => formatDate(new Date(quiz.created_at)), [
    quiz.created_at,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.title}>{quiz.title}</div>
          <div className={styles.actions}>
            {/* <Button onClick={() => {}}>Finish now</Button> */}
          </div>
        </div>
        <div className={styles.caption}>created on {creationDate}</div>
      </div>
    </div>
  );
};

export default Header;
