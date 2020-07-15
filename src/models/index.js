import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';
import usersSagas from './users/sagas';

import sessionReducer from './session/slice';
import sessionSagas from './session/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  users: usersReducer,
  session: sessionReducer,
});

export const rootSaga = function* rootSaga() {
  yield all([usersSagas(), sessionSagas()]);
};
