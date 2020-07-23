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

    fetchQuiz(state) {
      state.status = 'pending';
    },
    fetchQuizSuccess(state, { payload }) {
      const quiz = payload.quizzes;
      const quizId = Object.keys(quiz)[0];
      state.byId[quizId] = quiz[quizId];
      state.allIds.push(quizId);
    },
  },
});

export const quizzesActions = actionTypes(quizzesSlice.actions);
export const quizzesExtraActions = {
  fetchQuizSuccess: quizzesActions.fetchQuizSuccess,
  fetchQuizzesSuccess: quizzesActions.fetchQuizzesSuccess,
};

export default quizzesSlice.reducer;
