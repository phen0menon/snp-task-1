import React from 'react';
import { useFormData } from '../utils';
import AuthInputGroup from 'components/AuthInputGroup/AuthInputGroup';
import authStyles from '../Auth.module.css';
import { Link } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { actions } from 'models/session/slice';

const inputs = [
  {
    name: 'userName',
    type: 'text',
    defaultValue: '',
    label: 'Username',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    defaultValue: '',
    label: 'Password',
    required: true,
  },
  {
    name: 'passwordConfirm',
    type: 'password',
    defaultValue: '',
    label: 'Confirm password',
    required: true,
  },
  {
    name: 'isAdmin',
    type: 'checkbox',
    defaultValue: false,
    label: 'Admin rights?',
    required: false,
  },
];

const Register = () => {
  const onFetchRegister = useAction(actions.fetchRegister);
  const { formData, onFormDataChange } = useFormData(
    inputs.reduce(
      (res, curr) => ({
        ...res,
        [curr.name]: curr.defaultValue,
      }),
      {}
    )
  );

  const handleRegister = event => {
    event.preventDefault();

    const { userName, password, passwordConfirm, isAdmin } = formData;

    if (!userName || !password || !passwordConfirm) return;
    if (password !== passwordConfirm) {
      alert("Passwords don't match!");
      return;
    }

    onFetchRegister({
      userName,
      password,
      passwordConfirm,
      isAdmin,
    });
  };

  const renderedInputs = React.useMemo(
    () =>
      inputs.map(input => (
        <AuthInputGroup
          id={input.name}
          key={input.name}
          type={input.type}
          label={input.label}
          required={input.required}
          value={formData[input.name]}
          data-input-name={input.name}
          onChange={onFormDataChange}
        />
      )),
    [inputs, formData]
  );

  return (
    <form onSubmit={handleRegister}>
      <>{renderedInputs}</>
      <div className={authStyles['form-submit']}>
        <div>
          <button type="submit" className={authStyles['form-button']}>
            Register
          </button>
        </div>
        <div>
          <Link to="login">Login?</Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
