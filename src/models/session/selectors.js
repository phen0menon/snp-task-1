import { createSelector } from 'reselect';

export const sessionSelector = createSelector(
  state => state,
  state => state.session
);

export const isAuthenticatedSelector = createSelector(
  sessionSelector,
  ({ userData }) => userData.id != null
);

export const isLoginFetchingSelector = createSelector(
  sessionSelector,
  ({ loginFetching }) => loginFetching
);

export const isRegisterFetchingSelector = createSelector(
  sessionSelector,
  ({ registerFetching }) => registerFetching
);

export const isInitialSessionFetchingSelector = createSelector(
  sessionSelector,
  ({ initialFetching }) => initialFetching
);

export const isLoginFailedSelector = createSelector(
  sessionSelector,
  ({ loginFailed }) => loginFailed
);
