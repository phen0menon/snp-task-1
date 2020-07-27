import { all } from 'redux-saga/effects';

import answersSagas from './answers/sagas';
import quizzesSagas from './quizzes/sagas';

export default function*() {
  yield all([answersSagas(), quizzesSagas()]);
}
