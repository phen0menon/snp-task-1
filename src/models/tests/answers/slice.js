/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { putNormalizedModifications } from 'models/helpers';
import { testsCommonActions } from 'models/tests/commonActions';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    byId: {},
    allIds: [],
    modifiedById: {},
    createdItems: {},

    newAnswerCreatingStatus: null,
  },
  reducers: {
    createNewAnswer(state) {
      state.newAnswerCreatingStatus = 'pending';
    },

    changeAnswerData(state, { payload }) {
      const { id, ...props } = payload;
      putNormalizedModifications(state, id, props);
    },
  },
  extraReducers: {
    [testsCommonActions.fetchQuizzesSuccess](
      state,
      {
        payload: { answers },
      }
    ) {
      state.byId = answers;
      state.allIds = Object.keys(answers);
    },

    [testsCommonActions.fetchQuizSuccess](
      state,
      {
        payload: { answers },
      }
    ) {
      state.byId = { ...state.byId, ...answers };
      state.allIds = [...state.allIds, ...Object.keys(answers)];
    },

    [testsCommonActions.createAnswerSuccess](
      state,
      {
        payload: { answer },
      }
    ) {
      state.allIds.push(answer.id);
      state.byId[answer.id] = answer;
      state.newAnswerCreatingStatus = 'success';
    },
  },
});

export const answersActions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;
