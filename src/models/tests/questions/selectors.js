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

export const isQuestionDeletingSelector = createSelector(
  [questionsSelector, (_, id) => id],
  ({ questionsDeletingIds }, id) => questionsDeletingIds.includes(id)
);

export const questionCreatingPendingSelector = createSelector(
  [questionsSelector],
  ({ questionCreatingStatus }) => questionCreatingStatus === 'pending'
);

export const questionCreatingSuccessSelector = createSelector(
  [questionsSelector],
  ({ questionCreatingStatus }) => questionCreatingStatus === 'success'
);
