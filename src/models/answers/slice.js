/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    setAnswers(
      state,
      {
        payload: { answers },
      }
    ) {
      state.byId = answers;
      state.allIds = Object.keys(answers);
    },
  },
});

export const answersActions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;
