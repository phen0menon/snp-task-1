import React from 'react';
import { Redirect } from 'react-router-dom';
import useSelector from 'hooks/useSelector';
import {
  isAuthenticatedSelector,
  isUserAdminSelector,
} from 'models/session/selectors';

export const AuthenticationStatus = {
  ANY: 0,
  AUTHENTICATED: 1,
  NOT_AUTHENTICATED: 2,
};

export const REDIRECT_AFTER_ACCESS_LC = 'RA:redirectAfterAccessURL';

const withAuthentication = (
  authenticationStatus,
  requireAdminRights = false
) => Component => props => {
  const authenticated = useSelector(isAuthenticatedSelector);
  const isAdmin = useSelector(isUserAdminSelector);

  switch (authenticationStatus) {
    case AuthenticationStatus.NOT_AUTHENTICATED: {
      if (!authenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }
    case AuthenticationStatus.AUTHENTICATED: {
      if (!authenticated || (requireAdminRights ? !isAdmin : false)) {
        window.localStorage.setItem(
          REDIRECT_AFTER_ACCESS_LC,
          window.location.pathname
        );
        return <Redirect to="/auth/login/" />;
      }
      return <Component {...props} />;
    }
    default: {
      return <Redirect to="/" />;
    }
  }
};

export default withAuthentication;
