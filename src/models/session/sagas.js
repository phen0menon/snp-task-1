import { takeLatest, all, put, call } from 'redux-saga/effects';
import * as api from 'api';

import { sessionActions } from './slice';

export function* fetchLogin({ payload }) {
  try {
    const response = yield call(api.fetchLogin, payload);
    const { id, is_admin, username } = response.data;
    yield put({
      type: sessionActions.fetchLoginSuccess,
      payload: { id, isAdmin: is_admin, username },
    });
  } catch (err) {
    const { error } = err.response.data;
    yield put({
      type: sessionActions.fetchLoginFailed,
      payload: { error },
    });
  }
}

export function* fetchRegister({ payload }) {
  try {
    const response = yield call(api.fetchRegister, payload);
    const { id, is_admin, username } = response.data;
    yield put({
      type: sessionActions.fetchRegisterSuccess,
      payload: { id, isAdmin: is_admin, username },
    });
  } catch (err) {
    yield put({
      type: sessionActions.fetchRegisterFailed,
      payload: { errors: err.response.data },
    });
  }
}

export function* fetchInitialSession() {
  try {
    yield put({ type: sessionActions.fetchInitialSession });
    const response = yield call(api.fetchCurrentUser);
    const { id, is_admin, username } = response.data;
    yield put({
      type: sessionActions.fetchInitialSessionSuccess,
      payload: { id, isAdmin: is_admin, username },
    });
  } catch (err) {
    yield put({
      type: sessionActions.fetchInitialSessionFailed,
    });
  }
}

export function* fetchLogout() {
  try {
    const response = yield call(api.fetchLogout);
    yield put({ type: sessionActions.fetchLogoutSuccess });
    yield put({ type: sessionActions.logout });
  } catch (err) {
    // TODO: Handle case when logout errored
    console.error(err);
  }
}

export default function*() {
  yield all([
    takeLatest(sessionActions.fetchLogin, fetchLogin),
    takeLatest(sessionActions.fetchLogout, fetchLogout),
    takeLatest(sessionActions.fetchRegister, fetchRegister),
  ]);
}
