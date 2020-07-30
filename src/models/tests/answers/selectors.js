import { createSelector } from 'reselect';
import { denormalize, schema } from 'normalizr';
import { testsSelector } from 'models/tests/selectors';

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
  (answersById, ids) =>
    denormalize(ids, [new schema.Entity('answers')], { answers: answersById })
);

export const createdAnswerSuccessSelector = createSelector(
  [answersSelector],
  ({ newAnswerCreatingStatus }) => newAnswerCreatingStatus === 'success'
);

export const createdAnswerLoadingSelector = createSelector(
  [answersSelector],
  ({ newAnswerCreatingStatus }) => newAnswerCreatingStatus === 'pending'
);

export const isAnswerDeletingSelector = createSelector(
  [answersSelector, (_, id) => id],
  ({ answersDeletingIds }, id) => {
    return answersDeletingIds.includes(id);
  }
);

export const isAnswerChangedSelector = createSelector(
  [answersSelector, (_, id) => id],
  ({ modifiedById }, id) => !!Object.getOwnPropertyDescriptor(modifiedById, id)
);
