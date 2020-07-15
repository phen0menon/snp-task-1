import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthenticationStatus = {
  ANY: 0,
  AUTHENTICATED: 1,
  NOT_AUTHENTICATED: 2,
};

export const REDIRECT_AFTER_ACCESS_LC = 'RA:redirectAfterAccessURL';

const withAuthentication = authenticationStatus => Component => props => {
  const authenticated = useSelector(state => state.authenticated);
  switch (authenticationStatus) {
    case AuthenticationStatus.NOT_AUTHENTICATED: {
      if (!authenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }
    case AuthenticationStatus.AUTHENTICATED: {
      if (!authenticated) {
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
