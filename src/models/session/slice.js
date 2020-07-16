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
    initialFetching: true,
    loginFetching: false,
    registerFetching: false,
  },
  reducers: {
    fetchLogin: state => {
      state.loginFetching = true;
    },
    fetchRegister: state => {
      state.registerFetching = true;
    },
    fetchCurrentUser: state => {
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
    fetchRegisterSuccess(state, payload) {
      state.registerFetching = false;
    },
    fetchLoginSuccess(state, { payload }) {
      state.loginFetching = false;
      state.userData = payload;
    },

    fetchLogout: state => {
      state.logoutFetching = true;
    },
    fetchLogoutSuccess(state) {},
  },
});

export const actions = actionTypes(sessionSlice.actions);

export default sessionSlice.reducer;
