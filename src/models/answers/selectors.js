import { createSelector } from 'reselect';
import { testsSelector } from 'models/quizzes/selectors';
import { denormalize, schema } from 'normalizr';

export const answersSelector = createSelector(
  [testsSelector],
  tests => tests.answers
);

export const answersByIdSelector = createSelector(
  [answersSelector],
  ({ byId }) => byId
);

export const getAnswersByIdsSelector = createSelector(
  [answersByIdSelector, (_, ids) => ids],
  (answersByid, ids) =>
    denormalize(ids, [new schema.Entity('answers')], { answers: answersByid })
);
