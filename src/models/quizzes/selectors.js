import { createSelector } from 'reselect';

export const testsSelector = createSelector(
  [state => state],
  state => state.tests
);

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
  [quizzesByIdSelector, (_, id) => id],
  (quizzesById, id) => {
    return quizzesById[id] || { fetched: false };
  }
);
