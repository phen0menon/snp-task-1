/* eslint-disable no-param-reassign */

import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux-starter-kit';

import sessionReducer, { logoutAction } from './session/slice';
import sessionSagas, { fetchInitialSession } from './session/sagas';

import quizzesReducer from './quizzes/slice';
import quizzesSagas from './quizzes/sagas';

import answersReducer from './answers/slice';

import questionsReducer from './questions/slice';

export const createCombinedReducer = history =>
  combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    tests: combineReducers({
      quizzes: quizzesReducer,
      questions: questionsReducer,
      answers: answersReducer,
    }),
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
    quizzesSagas(),
  ]);
};
