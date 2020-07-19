/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    userData: {
      id: null,
      isAdmin: null,
      username: null,
    },
    initialFetching: false,

    loginFetching: false,
    loginError: null,

    registerErrors: {},
    registerFetching: false,
  },
  reducers: {
    fetchLogin: state => {
      state.loginFetching = true;
      state.loginFailed = false;
      state.loginError = null;
    },
    fetchLoginSuccess(state, { payload }) {
      state.loginFetching = false;
      state.userData = payload;
    },
    fetchLoginFailed(state, { payload }) {
      state.loginFetching = false;
      state.loginError = payload.error;
    },

    fetchRegister: state => {
      state.registerFetching = true;
      state.registerErrors = {};
    },
    fetchRegisterSuccess(state, { payload }) {
      state.registerFetching = false;
      state.userData = payload;
    },
    fetchRegisterFailed(state, { payload }) {
      state.registerErrors = payload.errors;
      state.registerFetching = false;
    },

    fetchInitialSession: state => {
      state.initialFetching = true;
    },
    fetchInitialSessionSuccess(state, { payload }) {
      state.initialFetching = false;
      state.userData = payload;
    },
    fetchInitialSessionFailed(state) {
      state.initialFetching = false;
    },

    fetchLogout: state => {
      state.logoutFetching = true;
    },
    fetchLogoutSuccess(state) {},
    logout() {},
  },
});

export const sessionActions = actionTypes(sessionSlice.actions);
export const logoutAction = sessionActions.logout;

export default sessionSlice.reducer;
