import { createSelector } from 'reselect';
import { testsSelector } from 'models/tests/selectors';

const getId = (_, id) => id;

export const quizzesSelector = createSelector(
  [testsSelector],
  tests => tests.quizzes
);

export const quizzesByIdSelector = createSelector(
  [quizzesSelector],
  ({ byId }) => byId
);

export const quizListSelector = createSelector(
  [quizzesByIdSelector],
  quizzesById => Object.values(quizzesById)
);

export const quizAllIdsSelector = createSelector(
  [quizzesSelector],
  ({ allIds }) => allIds
);

export const getQuizDataByIdSelector = createSelector(
  [quizzesByIdSelector, getId],
  (quizzesById, id) => quizzesById[id] || { fetched: false }
);

export const getQuizCreatingStatus = createSelector(
  [quizzesSelector],
  ({ quizCreatingStatus }) => quizCreatingStatus
);
