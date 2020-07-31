import { takeLatest, takeEvery, all, put, call } from 'redux-saga/effects';
import * as api from 'api';
import { questionsActions } from './slice';
import { testsCommonActions } from 'models/tests/commonActions';

export function* fetchCreateQuestion({ payload }) {
  try {
    const response = yield call(api.fetchCreateQuestion, payload);
    yield put({
      type: testsCommonActions.questionCreated,
      payload: {
        quizId: payload.quizId,
        question: response.data,
      },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export function* fetchDeleteQuestion({ payload: { quizId, questionId } }) {
  try {
    yield call(api.fetchDeleteQuestion, { questionId });
    yield put({
      type: testsCommonActions.questionDeleted,
      payload: { quizId, questionId },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export function* fetchSaveQuestionData({ payload: { id, questionData } }) {
  try {
    yield call(api.fetchUpdateQuestion, { id, questionData });
    yield put({
      type: questionsActions.saveQuestionDataSuccess,
      payload: { id },
    });
  } catch (err) {
    const { error } = err.response.data;
    console.error(error);
  }
}

export default function*() {
  yield all([
    takeLatest(questionsActions.createQuestion, fetchCreateQuestion),
    takeLatest(questionsActions.saveQuestionData, fetchSaveQuestionData),
    takeEvery(questionsActions.deleteQuestion, fetchDeleteQuestion),
  ]);
}
