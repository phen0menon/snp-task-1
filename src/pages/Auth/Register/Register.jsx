import React from 'react';
import { useFormData } from '../utils/utils';
import AuthInputGroup from 'components/AuthInputGroup/AuthInputGroup';
import authStyles from '../Auth.scss';
import { Link } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { sessionActions } from 'models/session/slice';
import { useSelector } from 'react-redux';
import { registerErrorsSelector } from 'models/session/selectors';
import {
  registerFormErrorsInitialState,
  registerFormInitialState,
  registerFormInputs,
} from './constants';
import { AuthFormErrors } from '../utils/contants';

const Register = () => {
  const onFetchRegister = useAction(sessionActions.fetchRegister);

  // Remote register errors (server-side)
  const registerErrors = useSelector(registerErrorsSelector);

  // Local validation errors
  const [formErrors, setFormErrors] = React.useState(
    registerFormErrorsInitialState
  );

  const { formData, handleChange, handleSubmit } = useFormData({
    fields: registerFormInitialState,
    onSubmit: React.useCallback(
      values => {
        setFormErrors(registerFormErrorsInitialState);

        const { username, password, passwordConfirm, isAdmin } = values;

        if (!username || !password || !passwordConfirm) return;

        if (password !== passwordConfirm) {
          setFormErrors({
            ...formErrors,
            passwordConfirm: [AuthFormErrors.PASSWORDS_DONT_MATCH],
          });
          return;
        }

        onFetchRegister({
          username,
          password,
          passwordConfirm,
          isAdmin,
        });
      },
      [formErrors, onFetchRegister, setFormErrors]
    ),
  });

  const getRegisterErrorsByInput = React.useCallback(
    inputName => formErrors[inputName].concat(registerErrors[inputName] || []),
    [registerErrors, formErrors]
  );

  const renderedInputs = React.useMemo(
    () =>
      registerFormInputs.map(input => (
        <AuthInputGroup
          id={input.name}
          key={input.name}
          type={input.type}
          label={input.label}
          required={input.required}
          value={formData[input.name]}
          errors={getRegisterErrorsByInput(input.name)}
          data-input-name={input.name}
          onChange={handleChange}
        />
      )),
    [formData, handleChange, getRegisterErrorsByInput]
  );

  return (
    <form onSubmit={handleSubmit}>
      <>{renderedInputs}</>
      <div className={authStyles.formSubmit}>
        <div>
          <button type="submit" className={authStyles.formButton}>
            Register
          </button>
        </div>
        <div>
          <Link to="/auth/login">Login?</Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
