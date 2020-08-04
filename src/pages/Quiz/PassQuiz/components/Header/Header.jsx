import React, { useContext, useMemo } from 'react';
import { QuizDataContext } from '../../PassQuiz';
import { formatDate } from 'utils/common';
import styles from './Header.scss';

const Header = () => {
  const { created_at, title } = useContext(QuizDataContext);

  const creationDate = useMemo(() => formatDate(new Date(created_at)), [
    created_at,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
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
