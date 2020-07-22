import * as Yup from 'yup';

export const registerFormInputs = [
  {
    name: 'username',
    type: 'text',
    value: '',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    value: '',
    label: 'Password',
  },
  {
    name: 'passwordConfirm',
    type: 'password',
    value: '',
    label: 'Confirm password',
  },
  {
    name: 'isAdmin',
    type: 'checkbox',
    value: false,
    label: 'Admin rights?',
  },
];

export const registerFormInitialState = registerFormInputs.reduce(
  (res, curr) => ({
    ...res,
    [curr.name]: curr.value,
  }),
  {}
);

export const registerFormValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Short password: minimum 6 symbols'),
  passwordConfirm: Yup.string()
    .required('Password confirmation is required')
    /* eslint-disable func-names */
    .test('passwords-match', 'Passwords dont match', function(value) {
      return this.parent.password === value;
    }),
  /* eslint-enable func-names */
});
