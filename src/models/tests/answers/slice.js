/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import {
  putNormalizedModifications,
  removeFromNormalized,
  removeFromArray,
} from 'models/helpers';
import { testsCommonActions } from 'models/tests/commonActions';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    byId: {},
    allIds: [],
    modifiedById: {},

    newAnswerCreatingStatus: null,
    answersDeletingIds: [],
  },
  reducers: {
    createNewAnswer(state) {
      state.newAnswerCreatingStatus = 'pending';
    },

    changeAnswerData(state, { payload }) {
      const { id, ...props } = payload;
      putNormalizedModifications(state, id, props);
    },

    deleteAnswer(
      state,
      {
        payload: { id },
      }
    ) {
      state.answersDeletingIds.push(id);
    },
  },
  extraReducers: {
    [testsCommonActions.quizzesFetched](
      state,
      {
        payload: { answers },
      }
    ) {
      state.byId = answers;
      state.allIds = Object.keys(answers);
    },

    [testsCommonActions.quizFetched](
      state,
      {
        payload: { answers },
      }
    ) {
      state.byId = { ...state.byId, ...answers };
      state.allIds = [...state.allIds, ...Object.keys(answers)];
    },

    [testsCommonActions.answerCreated](
      state,
      {
        payload: { answer },
      }
    ) {
      state.allIds.push(answer.id);
      state.byId[answer.id] = answer;
      state.newAnswerCreatingStatus = 'success';
    },

    [testsCommonActions.answerDeleted](
      state,
      {
        payload: { id },
      }
    ) {
      removeFromNormalized(state, id);
      removeFromArray(state.answersDeletingIds, id);
    },
  },
});

export const answersActions = actionTypes(answersSlice.actions);

export default answersSlice.reducer;