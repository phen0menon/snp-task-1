import * as Yup from 'yup';

export const loginInputs = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

export const loginInputsInitialState = loginInputs.reduce(
  (result, current) => ({ ...result, [current.name]: '' }),
  {}
);

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});
