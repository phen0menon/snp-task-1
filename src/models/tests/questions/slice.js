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

    questionSavingStatus: null,

    currentQuestionId: null,
  },
  reducers: {
    createQuestion(state) {
      state.questionCreatingStatus = 'pending';
    },

    changeQuestionData(state, { payload }) {
      const { id, ...restProps } = payload;
      putNormalizedModifications(state, id, restProps);
    },

    saveQuestionData(state) {
      state.questionSavingStatus = 'pending';
    },

    saveQuestionDataSuccess(
      state,
      {
        payload: { id },
      }
    ) {
      delete state.modifiedById[id];
      state.questionSavingStatus = 'success';
    },

    deleteQuestion(
      state,
      {
        payload: { questionId },
      }
    ) {
      state.questionsDeletingIds.push(questionId);
    },

    openQuestion(
      state,
      {
        payload: { id },
      }
    ) {
      state.currentQuestionId = id || null;
    },
  },
  extraReducers: {
    [testsCommonActions.quizzesFetched](
      state,
      {
        payload: { questions },
      }
    ) {
      if (!questions) return;
      state.byId = questions;
      state.allIds = Object.keys(questions);
    },

    [testsCommonActions.quizFetched](
      state,
      {
        payload: { questions },
      }
    ) {
      if (!questions) return;
      state.byId = { ...state.byId, ...questions };
      state.allIds = [...state.allIds, ...Object.keys(questions)];
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
      if (state.currentQuestionId === questionId) {
        state.currentQuestionId = null;
      }
      removeFromNormalized(state, questionId);
      removeFromArray(state.questionsDeletingIds, questionId);
    },
  },
});

export const questionsActions = actionTypes(questionsSlice.actions);

export default questionsSlice.reducer;
