import React from 'react';
import AuthInputGroup from 'components/AuthInputGroup/AuthInputGroup';
import authStyles from '../Auth.scss';
import { Link } from 'react-router-dom';
import useAction from 'hooks/useAction';
import { sessionActions } from 'models/session/slice';
import { useSelector } from 'react-redux';
import { registerErrorsSelector } from 'models/session/selectors';
import {
  registerFormInitialState,
  registerFormInputs,
  registerFormValidationSchema,
} from './constants';
import { useFormik } from 'formik';
import useCustomFormikErrors from 'hooks/useCustomFormikErrors';

const Register = () => {
  const onFetchRegister = useAction(sessionActions.fetchRegister);

  // Remote register errors (server-side)
  const registerErrors = useSelector(registerErrorsSelector);

  const {
    handleChange,
    handleSubmit,
    values: formValues,
    errors,
    touched,
    setErrors,
  } = useFormik({
    initialValues: registerFormInitialState,
    validationSchema: registerFormValidationSchema,
    onSubmit: values => {
      onFetchRegister(values);
    },
  });

  useCustomFormikErrors(registerErrors, setErrors);

  const getInputErrors = React.useCallback(
    name => (errors[name] && touched[name] ? errors[name] : null),
    [errors, touched]
  );

  const renderedInputs = React.useMemo(
    () =>
      registerFormInputs.map(input => (
        <AuthInputGroup
          id={input.name}
          name={input.name}
          key={input.name}
          type={input.type}
          label={input.label}
          value={formValues[input.name]}
          error={getInputErrors(input.name)}
          onChange={handleChange}
        />
      )),
    [formValues, handleChange, getInputErrors]
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
