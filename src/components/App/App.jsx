import React from 'react';
import PropTypes from 'prop-types';

import AppRouter from 'components/AppRouter';
import 'styles/normalize.scss';
import styles from './App.scss';

const App = ({ routes }) => {
  return (
    <div className={styles.app}>
      <AppRouter routes={routes} />
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
