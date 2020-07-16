import React, { Fragment } from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import { Link } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { actions } from 'models/session/slice';

const Home = () => {
  const onFetchLogout = useAction(actions.fetchLogout);
  const onLogoutClick = () => {
    onFetchLogout();
  };
  return (
    <Fragment>
      Hello, this is the Home Page. Go to
      <Link to="/auth/login"> link maybe</Link>
      <button type="button" onClick={onLogoutClick}>
        Logout
      </button>
    </Fragment>
  );
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
