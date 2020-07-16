import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';
import usersSagas from './users/sagas';

import sessionReducer from './session/slice';
import sessionSagas, { fetchInitialSession } from './session/sagas';
import { combineReducers } from 'redux-starter-kit';
import { logoutAction } from './session/slice';

export const createCombinedReducer = history =>
  combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    session: sessionReducer,
  });

export const createRootReducer = history => {
  const combinedReducer = createCombinedReducer(history);
  return (state, action) => {
    if (action.type === logoutAction) {
      state = undefined;
    }
    return combinedReducer(state, action);
  };
};

export const rootSaga = function* rootSaga() {
  yield all([
    // Check for user session existence
    fetchInitialSession(),
    usersSagas(),
    sessionSagas(),
  ]);
};
