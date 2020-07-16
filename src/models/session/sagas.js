import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';

import { actions } from './slice';

export function* fetchLogin({ payload }) {
  try {
    const response = yield call(api.fetchLogin, payload);
    if (response.status === 200) {
      const { id, is_admin, username } = response.data;
      yield put({
        type: actions.fetchLoginSuccess,
        payload: { id, isAdmin: is_admin, userName: username },
      });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* fetchRegister({ payload }) {
  try {
    const response = yield call(api.fetchRegister, payload);
    yield put({
      type: actions.fetchRegisterSuccess,
      payload: { token: response },
    });
  } catch (err) {
    console.error(err);
  }
}

export function* fetchInitialSession() {
  try {
    yield put({ type: actions.fetchInitialSession });
    const response = yield call(api.fetchCurrentUser);
    if (response.status === 200) {
      const { id, is_admin, username } = response.data;
      yield put({
        type: actions.fetchInitialSessionSuccess,
        payload: { id, is_admin, username },
      });
    }
  } catch (err) {
    yield put({
      type: actions.fetchInitialSessionFailed,
    });
  }
}

export function* fetchLogout() {
  try {
    const response = yield call(api.fetchLogout);
    if (response.status === 200) {
      yield put({ type: actions.fetchLogoutSuccess });
      yield put({ type: actions.logout });
    }
  } catch (err) {
    // TODO: Handle case when logout errored
    console.error(err);
  }
}

export default function*() {
  yield all([
    takeLatest(actions.fetchLogin, fetchLogin),
    takeLatest(actions.fetchLogout, fetchLogout),
    takeLatest(actions.fetchRegister, fetchRegister),
  ]);
}
