import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    userData: {
      id: null,
      isAdmin: null,
      userName: null,
    },
    initialFetching: false,

    loginFetching: false,
    loginFailed: false,

    registerFetching: false,
  },
  reducers: {
    fetchLogin: state => {
      state.loginFetching = true;
      state.loginFailed = false;
    },
    fetchLoginSuccess(state, { payload }) {
      state.loginFetching = false;
      state.userData = payload;
    },
    fetchLoginFailed(state) {
      state.loginFetching = false;
      state.loginFailed = true;
    },

    fetchRegister: state => {
      state.registerFetching = true;
    },
    fetchRegisterSuccess(state, { payload }) {
      state.registerFetching = false;
      state.userData = payload;
    },
    fetchRegisterFailed(state, { payload }) {
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

export const actions = actionTypes(sessionSlice.actions);
export const logoutAction = actions.logout;

export default sessionSlice.reducer;
