import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';

import { actions } from './slice';

export function* fetchLogin({ payload: { userName, password } }) {
  console.log('wtf??');
  try {
    const response = yield call(api.fetchLogin, { userName, password });
    console.log(response);
    yield put({
      type: actions.fetchLoginSuccess,
      payload: { token: response },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield all([takeLatest(actions.fetchLogin, fetchLogin)]);
}
