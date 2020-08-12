import { createSelector } from 'reselect';
import { denormalize, schema } from 'normalizr';

import { testsSelector } from 'models/tests/selectors';
import { getModifiedAnswersIdsSelector } from '../answers/selectors';

const getId = (_, id) => id;

export const questionsSelector = createSelector(
  [testsSelector],
  tests => tests.questions
);

export const questionsByIdSelector = createSelector(
  [questionsSelector],
  ({ byId }) => byId
);

export const getQuestionByIdSelector = createSelector(
  [questionsByIdSelector, getId],
  (questionsByid, id) => questionsByid[id]
);

export const getQuestionsByIdsSelector = createSelector(
  [questionsByIdSelector, getId],
  (questionsByid, ids) =>
    denormalize(ids, [new schema.Entity('questions')], {
      questions: questionsByid,
    })
);

export const isQuestionDeletingSelector = createSelector(
  [questionsSelector, getId],
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

export const getCurrentQuestionIdSelector = createSelector(
  [questionsSelector],
  ({ currentQuestionId }) => currentQuestionId
);

export const getCurrentQuestionEntity = createSelector(
  [questionsByIdSelector, getCurrentQuestionIdSelector],
  (byId, id) => byId[id]
);

export const getCurrentQuestionAnswersSelector = createSelector(
  [getCurrentQuestionEntity],
  entity => (entity ? entity.answers : [])
);

export const isCurrentQuestionInfoModifiedSelector = createSelector(
  [questionsSelector, getCurrentQuestionIdSelector],
  ({ modifiedById }, id) =>
    id != null && !!Object.getOwnPropertyDescriptor(modifiedById, id)
);

export const getCurrentQuestionAnswersModifications = createSelector(
  [getCurrentQuestionAnswersSelector, getModifiedAnswersIdsSelector],
  (answerIds, modifiedAnswerIds) =>
    answerIds.length
      ? modifiedAnswerIds.filter(id => answerIds.includes(id))
      : []
);

export const isCurrentQuestionHasAnswersModifications = createSelector(
  [getCurrentQuestionAnswersModifications],
  answerIds => !!answerIds.length
);

export const getCurrentQuestionSavingStatusSelector = createSelector(
  [questionsSelector],
  ({ questionSavingStatus }) => questionSavingStatus
);

export const isQuestionHasModificationsSelector = createSelector(
  [
    isCurrentQuestionInfoModifiedSelector,
    isCurrentQuestionHasAnswersModifications,
  ],
  (infoModified, answersModified) => infoModified || answersModified
);
