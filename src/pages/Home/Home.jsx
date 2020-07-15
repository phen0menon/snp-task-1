import React, { Fragment } from 'react';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

const Home = () => (
  <Fragment>Hello, this is the Home Page. Go to link maybe</Fragment>
);

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(Home);
