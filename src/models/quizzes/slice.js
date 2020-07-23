/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    byId: {},
    allIds: [],
    loading: false,
  },
  reducers: {
    fetchQuizzes(state) {
      state.loading = true;
    },

    fetchQuizzesSuccess(state) {
      state.loading = false;
    },

    fetchQuizzesFailed(state, { payload }) {
      console.log(payload);
    },

    setQuizzes(
      state,
      {
        payload: { quizzes },
      }
    ) {
      state.byId = quizzes;
      state.allIds = Object.keys(quizzes);
    },
  },
});

export const quizzesActions = actionTypes(quizzesSlice.actions);

export default quizzesSlice.reducer;
