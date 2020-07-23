/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    byId: {},
    allIds: [],
    meta: {},
    status: null,
  },
  reducers: {
    fetchQuizzes(state) {
      state.status = 'pending';
    },

    fetchQuizzesSuccess(state, { payload }) {
      const {
        data: { quizzes },
        meta,
      } = payload;

      state.status = 'success';
      state.byId = quizzes;
      state.allIds = Object.keys(quizzes);
      state.meta = meta;
    },

    fetchQuizzesFailed(state) {
      state.status = 'failure';
    },
  },
});

export const quizzesActions = actionTypes(quizzesSlice.actions);
export const quizzesExtraActions = {
  fetchQuizzesSuccess: quizzesActions.fetchQuizzesSuccess,
};

export default quizzesSlice.reducer;
