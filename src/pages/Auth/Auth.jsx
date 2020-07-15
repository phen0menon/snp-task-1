import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import withSceneUrl from 'hocs/withSceneUrl';

const Auth = props => {
  const { sceneUrl } = props;
  return (
    <>
      <div>Authenticate to Quiz</div>
      <Switch>
        <Route path={sceneUrl('register')} component={Register} />
        <Route path={'*'} component={Login} />
      </Switch>
    </>
  );
};

export default withSceneUrl(
  withAuthentication(AuthenticationStatus.NOT_AUTHENTICATED)(Auth)
);
