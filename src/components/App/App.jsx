import React from 'react';
import PropTypes from 'prop-types';
import AppRouter from 'components/AppRouter';
import Loading from 'components/Loading/Loading';
import useSelector from 'hooks/useSelector';
import { isInitialSessionFetchingSelector } from 'models/session/selectors';
import InitialLoader from 'components/InitialLoader/InitialLoader';

import 'styles/normalize.scss';
import 'styles/global.scss';
import styles from './App.scss';

const App = ({ routes }) => {
  const initialFetching = useSelector(isInitialSessionFetchingSelector);
  return (
    <div className={styles.app}>
      <Loading active={initialFetching} loader={InitialLoader}>
        <AppRouter routes={routes} />
      </Loading>
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
