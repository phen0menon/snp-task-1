import React from 'react';
import { actions } from 'models/session/slice';
import useAction from 'hooks/useAction';
import classnames from 'utils/classnames';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const onFetchLogin = useAction(actions.fetchLogin);

  const [formData, setFormData] = React.useState({
    userName: '',
    password: '',
  });

  const onFormDataChange = React.useCallback(
    event => {
      const { value, dataset } = event.target;
      const { inputName } = dataset;

      if (!inputName) {
        throw new Error('inputName should be defined as dataset attr');
      }

      setFormData({ ...formData, [inputName]: value });
    },
    [formData, setFormData]
  );

  const handleLogin = event => {
    event.preventDefault();

    const { userName, password } = formData;
    if (!userName || !password) return;
    onFetchLogin({ userName, password });
  };

  return (
    <div className={styles['login-form']}>
      <form onSubmit={handleLogin}>
        <div className={styles['login-form-group']}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            data-input-name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={onFormDataChange}
            required
          />
        </div>
        <div className={styles['login-form-group']}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            data-input-name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onFormDataChange}
            required
          />
        </div>
        <div
          className={classnames(
            styles['login-form-group'],
            styles['login-form-submit']
          )}
        >
          <div>
            <button type="submit">Sign in</button>
          </div>
          <div>
            <Link to="/auth/register">Register?</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
