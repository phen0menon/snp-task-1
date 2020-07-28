/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { testsCommonActions } from 'models/tests/commonActions';

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
    fetchQuizzesFailed(state) {
      state.status = 'failure';
    },
    fetchQuiz(state) {
      state.status = 'pending';
    },
  },
  extraReducers: {
    [testsCommonActions.quizzesFetched](
      state,
      {
        payload: { quizzes },
        meta,
      }
    ) {
      state.status = 'success';
      state.byId = quizzes;
      state.allIds = Object.keys(quizzes);
      state.meta = meta;
    },

    [testsCommonActions.quizFetched](state, { payload }) {
      const quiz = payload.quizzes;
      const quizId = Object.keys(quiz)[0];
      state.byId[quizId] = quiz[quizId];
      state.allIds.push(quizId);
    },
  },
});

export const quizzesActions = actionTypes(quizzesSlice.actions);

export default quizzesSlice.reducer;
