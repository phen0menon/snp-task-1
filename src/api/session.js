import Req from './request';

export const fetchLogin = ({ userName, password }) =>
  Req.POST({
    url: '/signin',
    data: {
      username: userName,
      password,
    },
  });

export const fetchLogout = () =>
  Req.DELETE({
    url: 'logout',
  });

export const fetchRegister = ({
  userName,
  password,
  passwordConfirm,
  isAdmin,
}) =>
  Req.POST({
    url: '/signup',
    data: {
      username: userName,
      password,
      password_confirmation: passwordConfirm,
      is_admin: isAdmin,
    },
  });

export const fetchCurrentUser = () =>
  Req.GET({
    url: '/users/current',
  });
