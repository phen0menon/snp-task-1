import React from 'react';
import { sessionActions } from 'models/session/slice';
import useAction from 'hooks/useAction';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import AuthInputGroup from 'components/AuthInputGroup';
import { useFormData } from '../utils/utils';
import authStyles from '../Auth.scss';
import { loginFormInitialState, loginFormInputs } from './constants';
import { useSelector } from 'react-redux';
import {
  isLoginFetchingSelector,
  loginErrorSelector,
} from 'models/session/selectors';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const Login = () => {
  const onFetchLogin = useAction(sessionActions.fetchLogin);

  const fetching = useSelector(isLoginFetchingSelector);
  const loginError = useSelector(loginErrorSelector);

  const { formData, handleChange, handleSubmit } = useFormData({
    fields: loginFormInitialState,
    onSubmit: React.useCallback(
      values => {
        const { username, password } = values;
        if (!username || !password || fetching) return;
        onFetchLogin({ username, password });
      },
      [fetching, onFetchLogin]
    ),
  });

  const renderedInputs = React.useMemo(
    () =>
      loginFormInputs.map(input => (
        <AuthInputGroup
          id={input.name}
          key={input.name}
          type={input.text}
          label={input.label}
          data-input-name={input.name}
          value={formData[input.name]}
          onChange={handleChange}
          required
        />
      )),
    [formData, handleChange]
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderedInputs}
      <div className={classnames(authStyles.formGroup, authStyles.formSubmit)}>
        <div>
          <button
            type="submit"
            className={authStyles.formButton}
            disabled={fetching}
          >
            Sign in
          </button>
        </div>
        <div>
          <Link to="/auth/register">Register?</Link>
        </div>
      </div>
      {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
    </form>
  );
};

export default Login;
