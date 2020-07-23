import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { quizzesActions } from './slice';
import { normalizeQuizzes } from './utils';
import { questionsActions } from 'models/questions/slice';
import { answersActions } from 'models/answers/slice';

export function* fetchQuizzes() {
  try {
    const response = yield call(api.fetchQuizzes);
    const { tests, meta } = response.data;
    const { entities: data } = normalizeQuizzes(tests);
    yield put({
      type: quizzesActions.fetchQuizzesSuccess,
      payload: { data, meta },
    });
  } catch (err) {
    const { error } = err.response.data;
    yield put({
      type: quizzesActions.fetchQuizzesFailed,
      payload: { error },
    });
  }
}

export default function*() {
  yield all([takeLatest(quizzesActions.fetchQuizzes, fetchQuizzes)]);
}
