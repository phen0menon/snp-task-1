import React from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

const Home = () => {
  return <div>Home</div>;
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
