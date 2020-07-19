export const registerFormInputs = [
  {
    name: 'username',
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

export const registerFormInitialState = registerFormInputs.reduce(
  (res, curr) => ({
    ...res,
    [curr.name]: curr.defaultValue,
  }),
  {}
);

export const registerFormErrorsInitialState = registerFormInputs.reduce(
  (res, curr) => ({
    ...res,
    [curr.name]: [],
  }),
  {}
);
