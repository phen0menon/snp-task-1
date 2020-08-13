import React from 'react';
import { sessionActions } from 'models/session/slice';
import useAction from 'hooks/useAction';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import AuthInputGroup from 'components/AuthInputGroup';
import authStyles from '../Auth.scss';
import useSelector from 'hooks/useSelector';
import {
  isLoginFetchingSelector,
  loginErrorSelector,
} from 'models/session/selectors';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useFormik } from 'formik';
import Button from 'components/Button/Button';
import {
  loginInputsInitialState,
  loginInputs,
  loginValidationSchema,
} from './constants';

const Login = () => {
  const onFetchLogin = useAction(sessionActions.fetchLogin);

  const fetching = useSelector(isLoginFetchingSelector);
  const loginError = useSelector(loginErrorSelector);

  const {
    handleChange,
    handleSubmit,
    values: formValues,
    errors,
    touched,
  } = useFormik({
    initialValues: loginInputsInitialState,
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      onFetchLogin(values);
    },
  });

  const getInputErrors = React.useCallback(
    name => (errors[name] && touched[name] ? errors[name] : null),
    [errors, touched]
  );

  const renderedInputs = React.useMemo(
    () =>
      loginInputs.map(input => (
        <AuthInputGroup
          key={input.name}
          id={input.name}
          name={input.name}
          type={input.type}
          label={input.label}
          onChange={handleChange}
          value={formValues[input.name]}
          error={getInputErrors(input.name)}
        />
      )),
    [handleChange, formValues, getInputErrors]
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderedInputs}
      <div className={classnames(authStyles.formGroup, authStyles.formSubmit)}>
        <div>
          <Button
            type="submit"
            className={authStyles.formButton}
            disabled={fetching}
          >
            Sign in
          </Button>
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
