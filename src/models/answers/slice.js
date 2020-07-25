/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { quizzesExtraActions } from 'models/quizzes/slice';
import { putNormalizedModifications } from 'models/helpers';

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
    createNewAnswerSuccess(state, { payload }) {
      const { answer } = payload;
      state.allIds.push(answer.id);
      state.byId[answer.id] = answer;
      state.newAnswerCreatingStatus = 'success';
    },

    changeAnswerData(state, { payload }) {
      const { id, temprary, ...restProps } = payload;
      putNormalizedModifications({ state, id, restProps });
    },
  },
  extraReducers: {
    [quizzesExtraActions.fetchQuizzesSuccess](state, { payload }) {
      const { answers } = payload;
      state.byId = answers;
      state.allIds = Object.keys(answers);
    },
    [quizzesExtraActions.fetchQuizSuccess](state, { payload }) {
      const { answers } = payload;
      const keys = Object.keys(answers);
      state.byId = { ...state.byId, ...answers };
      state.allIds = [...state.allIds, ...keys];
    },
  },
});

export const answersActions = actionTypes(answersSlice.actions);
export const answersExtraActions = {
  createNewAnswerSuccess: answersActions.createNewAnswerSuccess,
};

export default answersSlice.reducer;
