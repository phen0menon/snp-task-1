import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: null,
    fetching: false,
  },
  reducers: {
    fetchLogin: state => {
      state.fetching = true;
    },
    fetchLoginSuccess(state, { payload }) {
      state.fetching = false;
      state.token = payload.token;
    },
  },
});

export const actions = actionTypes(sessionSlice.actions);

export default sessionSlice.reducer;
