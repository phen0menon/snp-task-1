import {
  takeLatest,
  takeEvery,
  all,
  put,
  call,
  select,
} from 'redux-saga/effects';
import * as api from 'api';
import { questionsActions } from './slice';
import { testsCommonActions } from 'models/tests/commonActions';
import { QUIZ_NUMBER_KIND } from '../../../pages/Quiz/constants';
import { getModifiedAnswersEntitiesByIdsSelector } from '../answers/selectors';
import { normalize } from 'normalizr';
import { answerSchema } from '../schemas';
import { answersActions } from '../answers/slice';

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

    if (questionData.question_type !== QUIZ_NUMBER_KIND) {
      const updatedAnswers = yield select(
        getModifiedAnswersEntitiesByIdsSelector,
        questionData.answers
      );
      const responses = yield all(
        updatedAnswers.map(answer =>
          call(api.fetchUpdateAnswer, { id: answer.id, data: answer })
        )
      );
      const responseData = responses.map(res => res.data);
      const answersIds = normalize(responseData, [answerSchema]).result;
      yield put({
        type: answersActions.answersUpdates,
        payload: { ids: answersIds },
      });
    }

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
