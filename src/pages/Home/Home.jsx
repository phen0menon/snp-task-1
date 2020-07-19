import React from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import useAction from 'hooks/useAction';
import { sessionActions } from 'models/session/slice';

const Home = () => {
  const onFetchLogout = useAction(sessionActions.fetchLogout);
  return (
    <div>
      Home
      <button type="button" onClick={onFetchLogout}>
        Logout
      </button>
    </div>
  );
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
