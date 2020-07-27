import { createAction } from 'redux-starter-kit';
import actionTypes from 'utils/actionTypes';

const actionPrefix = 'tests/';

const createTestsAction = action => {
  if (!action) throw new Error(`createTestsAction: action should not be empty`);
  return { [action]: createAction(`${actionPrefix}${action}`) };
};

export const testsCommonActions = actionTypes({
  ...createTestsAction('fetchQuizzesSuccess'),
  ...createTestsAction('fetchQuizSuccess'),
  ...createTestsAction('createQuestionSuccess'),
  ...createTestsAction('createAnswerSuccess'),
});
