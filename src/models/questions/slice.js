/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    setQuestions(
      state,
      {
        payload: { questions },
      }
    ) {
      state.byId = questions;
      state.allIds = Object.keys(questions);
    },
  },
});

export const questionsActions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
