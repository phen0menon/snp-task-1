/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { quizzesExtraActions } from 'models/quizzes/slice';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {},
  extraReducers: {
    [quizzesExtraActions.fetchQuizzesSuccess](state, { payload }) {
      const { questions } = payload.data;

      state.byId = questions;
      state.allIds = Object.keys(questions);
    },
  },
});

export const questionsActions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;