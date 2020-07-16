import React from 'react';
import { actions } from 'models/session/slice';
import useAction from 'hooks/useAction';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import AuthInputGroup from 'components/AuthInputGroup';
import { useFormData } from '../utils';
import authStyles from '../Auth.module.css';
import { useSelector } from 'react-redux';
import { isLoginFetchingSelector } from 'models/session/selectors';

const inputs = [
  {
    name: 'userName',
    type: 'text',
    defaultValue: '',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    defaultValue: '',
    label: 'Password',
  },
];

const Login = () => {
  const onFetchLogin = useAction(actions.fetchLogin);
  const fetching = useSelector(isLoginFetchingSelector);

  const { formData, onFormDataChange } = useFormData(['userName', 'password']);

  const handleLogin = event => {
    event.preventDefault();

    const { userName, password } = formData;
    if (!userName || !password || fetching) return;
    onFetchLogin({ userName, password });
  };

  const renderedInputs = React.useMemo(
    () =>
      inputs.map(input => (
        <AuthInputGroup
          id={input.name}
          key={input.name}
          type={input.text}
          label={input.label}
          data-input-name={input.name}
          value={formData[input.name]}
          onChange={onFormDataChange}
          required
        />
      )),
    [inputs, formData, onFormDataChange]
  );

  return (
    <form onSubmit={handleLogin}>
      <>{renderedInputs}</>
      <div
        className={classnames(
          authStyles['form-group'],
          authStyles['form-submit']
        )}
      >
        <div>
          <button
            type="submit"
            className={authStyles['form-button']}
            disabled={fetching}
          >
            Sign in
          </button>
        </div>
        <div>
          <Link to="register">Register?</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
