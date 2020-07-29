import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { quizzesActions, questionsActions } from './slice';
import { testsCommonActions } from 'models/tests/commonActions';

export function* fetchCreateQuestion({ payload }) {
  try {
    const response = yield call(api.fetchCreateQuestion, payload);
    console.log(response);
  } catch (err) {
    return console.error(err);
    const { error } = err.response.data;
  }
}

export default function*() {
  yield all([takeLatest(questionsActions.createQuestion, fetchCreateQuestion)]);
}
