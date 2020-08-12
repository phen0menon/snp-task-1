import * as api from 'api';
import { takeLatest, takeEvery, all, put, call } from 'redux-saga/effects';
import { answersActions } from './slice';
import { testsCommonActions } from 'models/tests/commonActions';

export function* fetchCreateAnswer({ payload: data }) {
  try {
    const response = yield call(api.fetchCreateAnswer, data);
    yield put({
      type: testsCommonActions.answerCreated,
      payload: { questionId: data.questionId, answer: response.data },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export function* fetchDeleteAnswer({ payload: { questionId, id } }) {
  try {
    yield call(api.fetchDeleteAnswer, { id });
    yield put({
      type: testsCommonActions.answerDeleted,
      payload: { questionId, id },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(answersActions.createNewAnswer, fetchCreateAnswer),
    takeEvery(answersActions.deleteAnswer, fetchDeleteAnswer),
  ]);
}
