/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';
import {
  putNormalizedModifications,
  removeFromArray,
  removeFromNormalized,
} from 'models/helpers';
import { testsCommonActions } from 'models/tests/commonActions';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    byId: {},
    allIds: [],

    // Map { id : item } of modified items
    modifiedById: {},

    questionsDeletingIds: [],

    questionCreatingStatus: null,
  },
  reducers: {
    createQuestion(state) {
      state.questionCreatingStatus = 'pending';
    },

    changeQuestionData(state, { payload }) {
      const { id, ...restProps } = payload;
      putNormalizedModifications(state, id, restProps);
    },

    deleteQuestion(
      state,
      {
        payload: { questionId },
      }
    ) {
      state.questionsDeletingIds.push(questionId);
    },
  },
  extraReducers: {
    [testsCommonActions.quizzesFetched](
      state,
      {
        payload: { questions },
      }
    ) {
      state.byId = questions;
      state.allIds = Object.keys(questions);
    },

    [testsCommonActions.quizFetched](state, { payload }) {
      const { questions } = payload;
      const keys = Object.keys(questions);
      state.byId = { ...state.byId, ...questions };
      state.allIds = [...state.allIds, ...keys];
    },

    [testsCommonActions.answerCreated](
      state,
      {
        payload: { questionId, answer },
      }
    ) {
      state.byId[questionId].answers.push(answer.id);
    },

    [testsCommonActions.answerDeleted](
      state,
      {
        payload: { questionId, id },
      }
    ) {
      removeFromArray(state.byId[questionId].answers, id);
    },

    [testsCommonActions.questionCreated](
      state,
      {
        payload: { question },
      }
    ) {
      state.byId[question.id] = question;
      state.allIds.push(question.id);
      state.questionCreatingStatus = 'success';
    },

    [testsCommonActions.questionDeleted](
      state,
      {
        payload: { questionId },
      }
    ) {
      removeFromNormalized(state, questionId);
      removeFromArray(state.questionsDeletingIds, questionId);
    },
  },
});

export const questionsActions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
