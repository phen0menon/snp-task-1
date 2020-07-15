import { createSelector } from 'reselect';

export const sessionSelector = createSelector(
  state => state,
  state => state.session
);

export const isAuthenticatedSelector = createSelector(
  sessionSelector,
  ({ token }) => !!token
);
