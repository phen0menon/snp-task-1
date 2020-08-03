import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { testsSelector } from 'models/tests/selectors';
import { answerSchema } from '../schemas';

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
    denormalize(ids, [answerSchema], { answers: answersById })
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

export const getModifiedAnswersEntitiesByIdsSelector = createSelector(
  [answersByIdSelector, modifiedAnswersByIdSelector, getId],
  (answersById, modifiedAnswersById, ids) =>
    ids
      .filter(id => Object.getOwnPropertyDescriptor(modifiedAnswersById, id))
      .map(id => answersById[id])
);
