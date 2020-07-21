import React from 'react';
import styles from './InitialLoader.scss';
import preloader from 'images/preloader.svg';

const InitialLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles['loader-inner']}>
        <img src={preloader} alt="loading..." />
      </div>
    </div>
  );
};

export default InitialLoader;
