/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { quizzesExtraActions } from 'models/quizzes/slice';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {},
  extraReducers: {
    [quizzesExtraActions.fetchQuizzesSuccess](state, { payload }) {
      const { answers } = payload.data;

      state.byId = answers;
      state.allIds = Object.keys(answers);
    },
  },
});

export const answersActions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;
