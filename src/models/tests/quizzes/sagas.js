import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { quizzesActions } from './slice';
import { normalizeQuizzes } from './utils';
import { testsCommonActions } from 'models/tests/commonActions';

export function* fetchQuizzes() {
  try {
    const response = yield call(api.fetchQuizzes);
    const { tests, meta } = response.data;
    const { entities: data } = normalizeQuizzes(tests);
    yield put({
      type: testsCommonActions.fetchQuizzesSuccess,
      payload: data,
      meta,
    });
  } catch (err) {
    const { error } = err.response.data;
    yield put({
      type: quizzesActions.fetchQuizzesFailed,
      error,
    });
  }
}

export function* fetchQuiz({ payload: { id } }) {
  try {
    const { data: quiz } = yield call(api.fetchQuiz, id);
    const { entities: data } = normalizeQuizzes([quiz]);
    yield put({
      type: testsCommonActions.fetchQuizSuccess,
      payload: data,
    });
  } catch (err) {
    const { error } = err.response.data;
    yield put({
      type: quizzesActions.fetchQuizFailed,
      error,
    });
  }
}

export default function*() {
  yield all([
    takeLatest(quizzesActions.fetchQuizzes, fetchQuizzes),
    takeLatest(quizzesActions.fetchQuiz, fetchQuiz),
  ]);
}
