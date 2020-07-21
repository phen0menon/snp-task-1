export const loginFormInputs = [
  {
    name: 'username',
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

export const loginFormInitialState = loginFormInputs.reduce(
  (result, current) => ({
    ...result,
    [current.name]: current.defaultValue,
  }),
  {}
);
