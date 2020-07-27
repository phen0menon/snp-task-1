/* eslint-disable no-param-reassign */

import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux-starter-kit';

import sessionReducer, { logoutAction } from './session/slice';
import sessionSagas, { fetchInitialSession } from './session/sagas';

import testsReducer from './tests/reducer';
import testsSagas from './tests/sagas';

export const createCombinedReducer = history =>
  combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    tests: testsReducer,
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
    sessionSagas(),
    testsSagas(),
  ]);
};
