import Req from './request';

export const fetchLogin = ({ username, password }) =>
  Req.POST({
    url: '/signin',
    data: {
      username,
      password,
    },
  });

export const fetchLogout = () =>
  Req.DELETE({
    url: 'logout',
  });

export const fetchRegister = ({
  username,
  password,
  passwordConfirm,
  isAdmin,
}) =>
  Req.POST({
    url: '/signup',
    data: {
      username,
      password,
      password_confirmation: passwordConfirm,
      is_admin: isAdmin,
    },
  });

export const fetchCurrentUser = () =>
  Req.GET({
    url: '/users/current',
  });
