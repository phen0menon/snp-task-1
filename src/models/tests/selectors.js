import { createSelector } from 'reselect';

export const testsSelector = createSelector(
  [state => state],
  state => state.tests
);
