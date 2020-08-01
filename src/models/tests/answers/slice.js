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

    answersUpdates(
      state,
      {
        payload: { ids },
      }
    ) {
      ids.forEach(id => {
        delete state.modifiedById[id];
      });
    },

    undoAnswerChanges(
      state,
      {
        payload: { id },
      }
    ) {
      if (!Object.getOwnPropertyDescriptor(state.modifiedById, id)) {
        throw new Error(
          `undoAnswerChanges: there's no modified item with id ${id}`
        );
      }
      state.byId[id] = state.modifiedById[id];
      delete state.modifiedById[id];
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
      if (!answers) return;
      state.byId = answers;
      state.allIds = Object.keys(answers);
    },

    [testsCommonActions.quizFetched](
      state,
      {
        payload: { answers },
      }
    ) {
      if (!answers) return;
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
