import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { answersActions } from 'models/answers/slice';

export function* fetchCreateAnswer({ payload: data }) {
  try {
    const response = yield call(api.fetchCreateAnswer, data);
    yield put({
      type: answersActions.createNewAnswerSuccess,
      payload: { questionId: data.questionId, answer: response.data },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export default function*() {
  yield all([takeLatest(answersActions.createNewAnswer, fetchCreateAnswer)]);
}
