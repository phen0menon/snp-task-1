import { createSelector } from 'reselect';
import { denormalize, schema } from 'normalizr';
import { testsSelector } from 'models/tests/selectors';

const getId = (_, id) => id;

export const answersSelector = createSelector(
  [testsSelector],
  tests => tests.answers
);

export const answersByIdSelector = createSelector(
  [answersSelector],
  ({ byId }) => byId
);

export const getAnswersByIdsSelector = createSelector(
  [answersByIdSelector, getId],
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
  [answersSelector, getId],
  ({ answersDeletingIds }, id) => answersDeletingIds.includes(id)
);

export const modifiedAnswersByIdSelector = createSelector(
  [answersSelector],
  ({ modifiedById }) => modifiedById
);

export const isAnswerChangedSelector = createSelector(
  [modifiedAnswersByIdSelector, getId],
  (modifiedAnswersById, id) =>
    !!Object.getOwnPropertyDescriptor(modifiedAnswersById, id)
);

export const getModifiedAnswersIdsSelector = createSelector(
  [modifiedAnswersByIdSelector],
  modifiedAnswersById =>
    Object.keys(modifiedAnswersById).map(id => parseInt(id, 10))
);
