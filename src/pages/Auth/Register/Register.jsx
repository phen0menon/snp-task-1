import React from 'react';
import { useFormData } from '../utils';
import AuthInputGroup from 'components/AuthInputGroup/AuthInputGroup';
import authStyles from '../Auth.scss';
import { Link } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { actions } from 'models/session/slice';
import { AuthFormErrors } from '../contants';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

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

const initialState = inputs.reduce(
  (res, curr) => ({
    ...res,
    [curr.name]: curr.defaultValue,
  }),
  {}
);

const Register = () => {
  const onFetchRegister = useAction(actions.fetchRegister);

  const [formError, setFormError] = React.useState();
  const { formData, handleChange, handleSubmit } = useFormData({
    fields: initialState,
    onSubmit: React.useCallback(
      values => {
        setFormError('');

        const { userName, password, passwordConfirm, isAdmin } = values;

        if (!userName || !password || !passwordConfirm) return;

        if (password !== passwordConfirm) {
          setFormError(AuthFormErrors.PASSWORDS_DONT_MATCH);
        }

        onFetchRegister({
          userName,
          password,
          passwordConfirm,
          isAdmin,
        });
      },
      [onFetchRegister]
    ),
  });

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
          onChange={handleChange}
        />
      )),
    [formData, handleChange]
  );

  return (
    <form onSubmit={handleSubmit}>
      <>{renderedInputs}</>
      <div className={authStyles['form-submit']}>
        <div>
          <button type="submit" className={authStyles['form-button']}>
            Register
          </button>
        </div>
        <div>
          <Link to="/auth/login">Login?</Link>
        </div>
      </div>

      {formError && <ErrorMessage>{formError}</ErrorMessage>}
    </form>
  );
};

export default Register;
