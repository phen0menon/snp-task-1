import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';
import withSceneUrl from 'hocs/withSceneUrl';
import styles from './Auth.scss';
import globalStyles from 'styles/global.scss';
import PropTypes from 'prop-types';

const Auth = props => {
  const { sceneUrl } = props;
  return (
    <div className={styles['login-form']}>
      <Switch>
        <Route path={sceneUrl('register')} component={Register} />
        <Route path={sceneUrl('login')} component={Login} />
      </Switch>
    </div>
  );
};

Auth.propTypes = {
  sceneUrl: PropTypes.func.isRequired,
};

export default withSceneUrl(
  withAuthentication(AuthenticationStatus.NOT_AUTHENTICATED)(Auth)
);
