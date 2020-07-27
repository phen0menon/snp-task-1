import { createSelector } from 'reselect';
import { denormalize, schema } from 'normalizr';

import { testsSelector } from 'models/tests/selectors';

export const questionsSelector = createSelector(
  [testsSelector],
  tests => tests.questions
);

export const questionsByIdSelector = createSelector(
  [questionsSelector],
  ({ byId }) => byId
);

export const getQuestionByIdSelector = createSelector(
  [questionsByIdSelector, (_, id) => id],
  (questionsByid, id) => questionsByid[id]
);

export const getQuestionsByIdsSelector = createSelector(
  [questionsByIdSelector, (_, ids) => ids],
  (questionsByid, ids) =>
    denormalize(ids, [new schema.Entity('questions')], {
      questions: questionsByid,
    })
);
