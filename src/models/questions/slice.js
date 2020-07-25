/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import { quizzesExtraActions } from 'models/quizzes/slice';
import { putNormalizedModifications } from 'models/helpers';
import { answersExtraActions } from 'models/answers/slice';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    byId: {},
    allIds: [],

    // Map { id : item } of modified items
    modifiedById: {},
  },
  reducers: {
    changeQuestionData(state, { payload }) {
      const { id, ...restProps } = payload;
      putNormalizedModifications(state, id, restProps);
    },
  },
  extraReducers: {
    [quizzesExtraActions.fetchQuizzesSuccess](state, { payload }) {
      const { questions } = payload.data;

      state.byId = questions;
      state.allIds = Object.keys(questions);
    },
    [quizzesExtraActions.fetchQuizSuccess](state, { payload }) {
      const { questions } = payload;
      const keys = Object.keys(questions);
      state.byId = { ...state.byId, ...questions };
      state.allIds = [...state.allIds, ...keys];
    },
    [answersExtraActions.createNewAnswerSuccess](state, { payload }) {
      const {
        questionId,
        answer: { id },
      } = payload;
      state.byId[questionId].answers.push(id);
    },
  },
});

export const questionsActions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
